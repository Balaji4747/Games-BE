import { MinesMath, OVERANDOUT_MATH } from '@provfair/apps/overandout/src/math/overandout';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { randomInt } from 'crypto';
import { writeFile, writeFileSync } from 'fs';
import { Command, CommandRunner } from 'nest-commander';
import * as XLSX from 'xlsx';
import { getRangeData } from './helper';

@Command({ name: 'overAndOutSim' })
export class OverAndOutSimCommand extends CommandRunner {
  private serverSeed = 'ac8ae51a5b2ccdd79591a533e559f6a1ebe9310dacd9caca0c0cb697470bc187';
  private clientSeed = 'AQyZcmezpe2hClwucS2W';
  private betAmount = 1;
  private selectBoxCount = 16;
  private minesSteps = 9;

  private totalBet = 0;
  private totalWin = 0;
  private maxWin = 0;
  private hits = 0;

  private simulationCount = 1000000; // 1M

  private gameMode: GameMode = GameMode.FIVE;

  private finalRTPsOutput = {};

  constructor(private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
    if (passedParam.includes('parse')) {
      this.createMath();
      return;
    }

    const allSupportedGameModes = [GameMode.ONE /*GameMode.THREE, GameMode.FIVE, GameMode.SEVEN*/];

    const simLoop = async () => {
      for (let index = 0; index < this.simulationCount; index++) {
        await this.sim(index);
      }

      this.finalRTPsOutput[this.gameMode][`${this.minesSteps}_${this.selectBoxCount}`] = {
        totalBet: this.totalBet,
        totalWin: this.totalWin,
        rtp: (this.totalWin / this.totalBet) * 100,
        hiRate: (this.hits / this.simulationCount) * 100,
        hits: this.hits,
      };

      // if (this.selectBoxCount != 25 - this.minesSteps) {
      //   this.selectBoxCount++;
      //   this.totalBet = 0;
      //   this.totalWin = 0;
      //   this.maxWin = 0;
      //   this.hits = 0;

      //   await simLoop();
      // }
    };

    for (let index = 0; index < allSupportedGameModes.length; index++) {
      this.gameMode = allSupportedGameModes[index];

      this.totalBet = 0;
      this.totalWin = 0;
      this.maxWin = 0;
      this.hits = 0;

      this.finalRTPsOutput[this.gameMode] = {};

      // while (this.minesSteps <= 24) {
      await simLoop();

      //   this.selectBoxCount = 1;
      //   this.minesSteps++;
      // }

      // this.selectBoxCount = 1;
      // this.minesSteps = 1;

      writeFileSync('result.json', JSON.stringify(this.finalRTPsOutput), 'utf8');
      console.log('complete result', this.gameMode);
    }
  }

  rng = (start: number, end: number, exclude?: number[]) => {
    const num = randomInt(start, end);

    if (exclude?.includes(num)) {
      return this.rng(start, end, exclude);
    }

    return num;
  };

  private selectRandomNumbers(count: number) {
    const numbers: number[] = [];
    for (let index = 0; index < count; index++) {
      numbers.push(this.rng(0, 24, numbers));
    }

    return numbers;
  }

  private async sim(nonce: number) {
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      this.serverSeed,
      this.clientSeed,
      nonce,
      GameCodes.OVERANDOUT,
    );

    const initialTiles = Array.from(Array(25).keys());

    const mines = generatedTarget.map((index) => {
      const mine_index = Math.floor(index);
      const mine_location = initialTiles[mine_index];
      initialTiles.splice(index, 1);
      return mine_location;
    });

    const minesPositions = mines.slice(0, this.minesSteps);

    const selectBox = this.selectRandomNumbers(this.selectBoxCount);

    this.totalBet += this.betAmount;

    let winAmount = 0;

    if (minesPositions.some((mp) => selectBox.includes(mp))) {
      winAmount = 0;
    } else {
      const mathData = OVERANDOUT_MATH[this.gameMode].multiplierMap[this.minesSteps - 1];
      const multiDetails = mathData.find((md) => md.gem === selectBox[selectBox.length - 1]);

      winAmount = this.betAmount * mathData[this.selectBoxCount - 1].multiplier;
    }

    if (winAmount > 0) {
      this.hits++;
    }

    this.totalWin += winAmount;

    if (winAmount > this.maxWin) {
      this.maxWin = winAmount;
    }
  }

  private createMath() {
    const finalData: MinesMath = {
      [GameMode.ONE]: { rtp: 99, multiplierMap: [] },
      [GameMode.THREE]: { rtp: 97, multiplierMap: [] },
      [GameMode.FIVE]: { rtp: 95, multiplierMap: [] },
      [GameMode.SEVEN]: { rtp: 93, multiplierMap: [] },
    };

    const workbook = XLSX.readFile('./maths/Mine_24.xlsx');

    const gameModesSheetMap = {
      [GameMode.ONE]: 'Mine_99',
      [GameMode.THREE]: 'Mine_97',
      [GameMode.FIVE]: 'Mine_95',
      [GameMode.SEVEN]: 'Mine_93',
    };

    for (const gameMode in gameModesSheetMap) {
      if (Object.prototype.hasOwnProperty.call(gameModesSheetMap, gameMode)) {
        const sheetName = gameModesSheetMap[gameMode];

        const worksheet = workbook.Sheets[sheetName];

        let c1R1 = 4;
        let l1R1 = 7;
        const startRange = (col1: number, col2: number) => `D${col1}:Z${col2}`;

        for (let i = 0; i < 25; i++) {
          if (i !== 0) {
            c1R1 = l1R1 + 3;
            l1R1 = c1R1 + 3;
          }
          const rawData = getRangeData(worksheet, startRange(c1R1, l1R1), false, false);
          const formattedData = [];
          for (let index = 0; index < rawData[0].length; index++) {
            if (!rawData[0][index] || !rawData[3][index]) {
              continue;
            }

            formattedData.push({
              gem: rawData[0][index],
              probability: Number(rawData[1][index].toFixed(4)),
              multiplier: Number(rawData[3][index].toFixed(4)),
            });
          }

          if (formattedData.length) {
            finalData[gameMode].multiplierMap.push(formattedData);
          }
        }
      }
    }

    writeFile('mines24Math.json', JSON.stringify(finalData, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('complete');
    });
  }
}
