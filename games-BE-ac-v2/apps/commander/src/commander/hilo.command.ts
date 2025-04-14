import { CardRankEnum, HiloGameConditions } from '@provfair/apps/hilo/src/domain/enums';
import { HILO_MATH } from '@provfair/apps/hilo/src/math/hilo';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { randomInt } from 'crypto';
import { writeFile, writeFileSync } from 'fs';
import { round } from 'mathjs';
import { Command, CommandRunner } from 'nest-commander';
import * as XLSX from 'xlsx';
import { getRangeData } from './helper';

@Command({ name: 'hiloSim' })
export class HiloCommand extends CommandRunner {
  private serverSeed = 'ac8ae51a5b2ccdd79591a533e559f6a1ebe9310dacd9caca0c0cb697470bc187';
  private clientSeed = 'AQyZcmezpe2hClwucS2W';
  private betAmount = 1;
  private rank = 'J';
  private suit = 'H';
  private guess: HiloGameConditions = HiloGameConditions.lowerEqual;

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

  // Custom shuffling function that doesn't modify the original array
  private deterministicShuffle(array: string[]): string[] {
    const newArray = [...array]; // Create a copy to avoid modifying the original
    for (let i = newArray.length - 1; i > 0; i--) {
      // Use a deterministic shuffle mechanism, e.g., a fixed seed-based index
      const j = (i + 2) % newArray.length; // Example deterministic index
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  async run(passedParam: string[]): Promise<void> {
    if (passedParam.includes('parse')) {
      this.createMath();
      return;
    }

    const allSupportedGameModes = [GameMode.ONE, GameMode.THREE, GameMode.FIVE, GameMode.SEVEN];

    const simLoop = async () => {
      for (let index = 0; index < this.simulationCount; index++) {
        const shuffledGuess: any = this.deterministicShuffle(Object.values(HiloGameConditions));

        this.guess = shuffledGuess[0];

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

      writeFileSync('hilo-sim-result.json', JSON.stringify(this.finalRTPsOutput), 'utf8');
      console.log('complete result', this.gameMode);
    }
  }

  private async sim(nonce: number) {
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      this.serverSeed,
      this.clientSeed,
      nonce,
      GameCodes.HILO,
    );

    const outcome = generatedTarget.reduce((map, curr) => {
      const card = HILO_MATH.suitOrder[Math.floor(curr)];

      const _map = {
        index: Math.floor(curr),
        card,
        rankValue: HILO_MATH.rankValue[card.split('-')[0]],
      };

      return [...map, { ..._map }];
    }, []);

    const expectedOutcome = outcome[0];

    let selectedMultiplier = 0;
    const rankValue = HILO_MATH.rankValue[this.rank];

    let isFailedGuess = false;
    let isSkippedGuess = false;
    const _lastCardPayoutInfo = HILO_MATH[this.gameMode].multiplierMap.find((el) => this.rank === el.rank);

    switch (this.guess) {
      case HiloGameConditions.low:
        isFailedGuess = rankValue <= expectedOutcome.rankValue;
        selectedMultiplier = _lastCardPayoutInfo.multiplierLow;
        break;
      case HiloGameConditions.high:
        isFailedGuess = rankValue >= expectedOutcome.rankValue;
        selectedMultiplier = _lastCardPayoutInfo.multiplierHigh;
        break;
      case HiloGameConditions.same:
        isFailedGuess = rankValue !== expectedOutcome.rankValue;
        selectedMultiplier = _lastCardPayoutInfo.multiplierHigh;

        if (this.rank === CardRankEnum.KING) {
          selectedMultiplier = _lastCardPayoutInfo.multiplierLow;
        }

        break;
      case HiloGameConditions.higherEqual:
        isFailedGuess = rankValue > expectedOutcome.rankValue ? true : false;
        selectedMultiplier = _lastCardPayoutInfo.multiplierHigh;
        break;
      case HiloGameConditions.lowerEqual:
        isFailedGuess = rankValue < expectedOutcome.rankValue ? true : false;
        selectedMultiplier = _lastCardPayoutInfo.multiplierLow;
        break;
      case HiloGameConditions.skip:
        isSkippedGuess = true;
        break;
    }

    let payoutMultiplier = 0;

    if (isFailedGuess) {
      payoutMultiplier = 0;
    } else if (isSkippedGuess) {
      payoutMultiplier = 0.99;
    } else {
      payoutMultiplier = selectedMultiplier * 1;
    }

    this.totalBet += this.betAmount;

    const winAmount = payoutMultiplier * this.betAmount;

    if (winAmount > 0) {
      this.hits++;
    }

    this.totalWin += winAmount;

    if (winAmount > this.maxWin) {
      this.maxWin = winAmount;
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
      numbers.push(this.rng(0, 25, numbers));
    }

    return numbers;
  }

  roundOff = (val: number, decimals = 2) => round(val, decimals);

  private createMath() {
    const finalData = {
      [GameMode.ONE]: { rtp: 99, multiplierMap: [] },
      [GameMode.THREE]: { rtp: 97, multiplierMap: [] },
      [GameMode.FIVE]: { rtp: 95, multiplierMap: [] },
      [GameMode.SEVEN]: { rtp: 93, multiplierMap: [] },
    };

    const workbook = XLSX.readFile('./maths/Crash_N_Hilo.xlsb');
    const worksheet = workbook.Sheets['Hilo_4RTPCombined'];

    const colMap = {
      [GameMode.ONE]: 'B3:G15',
      [GameMode.THREE]: 'B19:G31',
      [GameMode.FIVE]: 'B35:G47',
      [GameMode.SEVEN]: 'B51:G63',
    };

    for (const gameMode in colMap) {
      if (Object.prototype.hasOwnProperty.call(colMap, gameMode)) {
        const col = colMap[gameMode];

        const data = getRangeData(worksheet, col, false, false);

        for (const d of data) {
          let rank = d[0].toString();

          switch (rank) {
            case 'Ace':
              rank = 'A';
              break;
            case 'Jack':
              rank = 'J';
              break;
            case 'Queen':
              rank = 'Q';
              break;
            case 'King':
              rank = 'K';
              break;
          }

          finalData[gameMode].multiplierMap.push({
            rank,
            probHigh: this.roundOff(d[2] * 100),
            probLow: this.roundOff(d[3] * 100),
            multiplierHigh: this.roundOff(d[4], 4),
            multiplierLow: this.roundOff(d[5], 4),
            probability: this.roundOff(d[1] * 100),
          });
        }
      }
    }

    writeFile('hiloMath.json', JSON.stringify(finalData, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('complete');
    });
  }
}
