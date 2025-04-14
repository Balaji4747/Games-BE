import gameConfig from '@provfair/apps/dice/src/math/dice';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { DiceGameConditions, GameCodes, GameMode } from '@provfair/shared/enums';
import { writeFile, writeFileSync } from 'fs';
import { round } from 'mathjs';
import { Command, CommandRunner } from 'nest-commander';
import * as XLSX from 'xlsx';
import { getRangeData } from './helper';

@Command({ name: 'diceSim' })
export class DiceCommand extends CommandRunner {
  private serverSeed = 'ac8ae51a5b2ccdd79591a533e559f6a1ebe9310dacd9caca0c0cb697470bc187';
  private clientSeed = 'AQyZcmezpe2hClwucS2W';
  private betAmount = 1;
  private target = 50;
  private condition: DiceGameConditions = DiceGameConditions.ABOVE;

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

    const allSupportedGameModes = [GameMode.ONE, GameMode.THREE, GameMode.FIVE, GameMode.SEVEN];

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

      writeFileSync('dice-sim-result.json', JSON.stringify(this.finalRTPsOutput), 'utf8');
      console.log('complete result', this.gameMode);
    }
  }

  private async sim(nonce: number) {
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      this.serverSeed,
      this.clientSeed,
      nonce,
      GameCodes.DICE,
    );

    this.totalBet += this.betAmount;

    const outcome = Math.trunc(generatedTarget[0]) / 100;
    const payoutInfo = gameConfig[this.gameMode].multiplierMap.find((el) => el.outcome === this.target);

    // Determine payout and multiplier based on the condition
    const isWinningCondition =
      (this.condition === DiceGameConditions.ABOVE && outcome > this.target) ||
      (this.condition === DiceGameConditions.BELOW && outcome <= this.target);

    let winAmount = 0;

    if (isWinningCondition) {
      const multiplier =
        this.condition === DiceGameConditions.ABOVE ? payoutInfo.multiplierOver : payoutInfo.multiplierUnder;
      winAmount = multiplier * this.betAmount;
    }

    if (winAmount > 0) {
      this.hits++;
    }

    this.totalWin += winAmount;

    if (winAmount > this.maxWin) {
      this.maxWin = winAmount;
    }
  }

  roundOff = (val: number, decimals = 5) => round(val, decimals);

  private createMath() {
    const finalData = {
      [GameMode.ONE]: { rtp: 99, multiplierMap: [] },
      [GameMode.THREE]: { rtp: 97, multiplierMap: [] },
      [GameMode.FIVE]: { rtp: 95, multiplierMap: [] },
      [GameMode.SEVEN]: { rtp: 93, multiplierMap: [] },
    };

    const workbook = XLSX.readFile('./maths/Dice_4RTP Combined.xlsx');
    const sheetMap = {
      [GameMode.ONE]: 'Dice_99',
      [GameMode.THREE]: 'Dice_97',
      [GameMode.FIVE]: 'Dice_95',
      [GameMode.SEVEN]: 'Dice_93',
    };

    for (const gameMode in sheetMap) {
      if (Object.prototype.hasOwnProperty.call(sheetMap, gameMode)) {
        const sheetName = sheetMap[gameMode];

        const worksheet = workbook.Sheets[sheetName];

        const data = getRangeData(worksheet, 'B3:D99', false, false);
        const data2 = getRangeData(worksheet, 'M3:N99', false, false);

        for (let index = 0; index < data.length; index++) {
          const d = data[index];

          const probabilityOver = this.roundOff(d[1] * 100, 0);
          const probabilityUnder = this.roundOff(data2[index][0] * 100, 0);

          if (probabilityOver + probabilityUnder !== 100) {
            console.log({ gameMode, probabilityOver, probabilityUnder, outcome: d[0] });
            break;
          }

          finalData[gameMode].multiplierMap.push({
            outcome: d[0],
            probabilityOver,
            probabilityUnder,
            multiplierOver: this.roundOff(d[2]),
            multiplierUnder: this.roundOff(data2[index][1]),
          });
        }
      }
    }

    writeFile('diceMath.json', JSON.stringify(finalData, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('complete');
    });
  }
}
