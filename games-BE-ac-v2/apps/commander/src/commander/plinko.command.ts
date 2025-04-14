import { PlinkoLevel } from '@provfair/apps/plinko/src/domain/enums/plinkoLevel.enum';
import { IPlinkoGameLevel, PLINKO_MATH, PlinkoMath } from '@provfair/apps/plinko/src/math/plinko';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { CommonService } from '@provfair/shared/services/common.service';
import { writeFile, writeFileSync } from 'fs';
import { round } from 'mathjs';
import { Command, CommandRunner } from 'nest-commander';
import * as XLSX from 'xlsx';
import { getRangeData } from './helper';

@Command({ name: 'plinkoSim' })
export class PlinkoCommand extends CommandRunner {
  private serverSeed = 'ac8ae51a5b2ccdd79591a533e559f6a1ebe9310dacd9caca0c0cb697470bc187';
  private clientSeed = 'AQyZcmezpe2hClwucS2W';
  private betAmount = 1;
  private rows = 8;
  private risk: PlinkoLevel = PlinkoLevel.low;

  private totalBet = 0;
  private totalWin = 0;
  private maxWin = 0;
  private hits = 0;

  private simulationCount = 100000000; // 100M

  private gameMode: GameMode = GameMode.FIVE;

  private finalRTPsOutput = {};

  constructor(
    private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService,
    private readonly commonService: CommonService,
  ) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    if (passedParam.includes('parse')) {
      this.createMath();
      return;
    }

    // let finalRawOutcome = 0;

    const allSupportedGameModes = [GameMode.ONE, GameMode.THREE, GameMode.FIVE, GameMode.SEVEN];

    // for (const gm of allSupportedGameModes) {
    //   const math = PLINKO_MATH[gm];

    //   const row = math.gameLevel[PlinkoLevel.high].find((g) => g.row === 16).multiplierMap[0];
    //   const outcome = row.multiplier;

    //   if (outcome > finalRawOutcome) {
    //     finalRawOutcome = outcome;
    //   }
    // }

    // console.log(finalRawOutcome);
    // return;

    const simLoop = async () => {
      for (let index = 0; index < this.simulationCount; index++) {
        await this.sim(index);
      }
    };

    for (let index = 0; index < allSupportedGameModes.length; index++) {
      this.gameMode = allSupportedGameModes[index];

      this.totalBet = 0;
      this.totalWin = 0;
      this.maxWin = 0;
      this.hits = 0;

      await simLoop();

      this.finalRTPsOutput[this.gameMode] = {
        totalBet: this.totalBet,
        totalWin: this.totalWin,
        rtp: (this.totalWin / this.totalBet) * 100,
        hiRate: (this.hits / this.simulationCount) * 100,
        hits: this.hits,
      };

      writeFileSync('plinko-sim-result.json', JSON.stringify(this.finalRTPsOutput), 'utf8');
      console.log('complete result', this.gameMode);
    }
  }

  private async sim(nonce: number) {
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      this.serverSeed,
      this.clientSeed,
      nonce,
      GameCodes.PLINKO,
      this.gameMode,
    );

    this.totalBet += this.betAmount;

    const path = generatedTarget.map((el) => (!!Math.trunc(el) ? 'R' : 'L')).slice(0, this.rows);
    const payInfo = PLINKO_MATH[this.gameMode].gameLevel[this.risk].find((el) => el.row === this.rows).multiplierMap[
      path.filter((el) => el === 'R').length
    ];

    const multiplierMap = PLINKO_MATH[this.gameMode].gameLevel[this.risk].find(
      (el) => el.row === this.rows,
    ).multiplierMap;

    // const weights = {};

    // for (let index = 0; index < multiplierMap.length; index++) {
    //   weights[index] = multiplierMap[index].weight;
    // }

    // const selectedSymbol = await this.commonService.selectSymbolFromWeight(weights);
    // const multiplier = multiplierMap[selectedSymbol.selectedSymbol].multiplier;

    const winAmount = payInfo.multiplier * this.betAmount;

    if (winAmount > 0) {
      this.hits++;
    }

    this.totalWin += winAmount;

    if (winAmount > this.maxWin) {
      this.maxWin = winAmount;
    }
  }

  roundOff = (val: number, decimals = 3) => round(val, decimals);

  getNextAlphabet = (char: string, next = 1): string => {
    // Convert the character sequence (like 'A', 'Z', 'AA') to a number
    const toNumber = (str: string) => {
      return str.split('').reduce((acc, curr) => acc * 26 + (curr.charCodeAt(0) - 64), 0);
    };

    // Convert a number back to the Excel-style letter sequence
    const toAlphabet = (num: number) => {
      let result = '';
      while (num > 0) {
        num--; // Adjust for zero-based indexing in the calculation
        result = String.fromCharCode((num % 26) + 65) + result;
        num = Math.floor(num / 26);
      }
      return result;
    };

    // Convert the current character(s) to a number, add the 'next' increment, and convert back to letters
    const currentNumber = toNumber(char);
    const nextNumber = currentNumber + next;

    return toAlphabet(nextNumber);
  };

  capitalizedFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  private createMath() {
    const finalData: PlinkoMath = {
      [GameMode.ONE]: {
        rtp: 99,
        gameLevel: {
          low: [],
          medium: [],
          high: [],
        },
      },
      [GameMode.THREE]: {
        rtp: 97,
        gameLevel: { low: [], medium: [], high: [] },
      },
      [GameMode.FIVE]: {
        rtp: 95,
        gameLevel: { low: [], medium: [], high: [] },
      },
      [GameMode.SEVEN]: {
        rtp: 93,
        gameLevel: { low: [], medium: [], high: [] },
      },
    };

    const colMap = {
      8: 'A4:B12',
      [GameMode.THREE]: 'Dice_97',
      [GameMode.FIVE]: 'Dice_95',
      [GameMode.SEVEN]: 'Dice_93',
    };

    for (const gameMode of [GameMode.ONE, GameMode.THREE, GameMode.FIVE, GameMode.SEVEN]) {
      const workbook = XLSX.readFile(`./maths/Plinko_${finalData[gameMode].rtp}.xlsx`);

      for (const gameLevel of [PlinkoLevel.low, PlinkoLevel.medium, PlinkoLevel.high]) {
        const worksheet = workbook.Sheets[this.capitalizedFirstChar(gameLevel)];

        let initialCol = 'A4:C12';

        for (let index = 8; index <= 16; index++) {
          const multiplierMap: IPlinkoGameLevel['multiplierMap'] = [];

          if (index !== 8) {
            const splitCol = initialCol.split(':')[1];
            const col = splitCol.match(/[A-Za-z]+/g)?.join('') || ''; // Extracts letters
            const row = Number(splitCol.match(/[0-9]+/g)?.join('') || 0) + 1; // Extracts numbers

            const nextCol = this.getNextAlphabet(col, 2);
            const col2 = this.getNextAlphabet(nextCol, 2);

            initialCol = `${nextCol}4:${col2}${row}`;
          }

          const data = getRangeData(worksheet, initialCol, false, false);
          for (const d of data) {
            multiplierMap.push({ multiplier: d[0], probability: this.roundOff(d[1] * 100), weight: d[2] });
          }

          finalData[Number(gameMode)].gameLevel[gameLevel].push({ row: index, multiplierMap });
        }
      }
    }

    writeFile('plinkoMath.json', JSON.stringify(finalData), 'utf8', (err) => {
      if (err) throw err;
      console.log('complete');
    });
  }
}
