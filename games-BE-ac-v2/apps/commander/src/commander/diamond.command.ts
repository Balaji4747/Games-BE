import { DIAMONDS_MATH, DiamondsMath, IDiamondsMultiplierMap } from '@provfair/apps/diamonds/src/math/diamonds';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { CommonService } from '@provfair/shared/services/common.service';
import { writeFile, writeFileSync } from 'fs';
import { round } from 'mathjs';
import { Command, CommandRunner } from 'nest-commander';
import * as XLSX from 'xlsx';
import { getRangeData } from './helper';

@Command({ name: 'diamondSim' })
export class DiamondSimCommand extends CommandRunner {
  private serverSeed = 'ac8ae51a5b2ccdd79591a533e559f6a1ebe9310dacd9caca0c0cb697470bc187';
  private clientSeed = 'AQyZcmezpe2hClwucS2W';
  private betAmount = 1;

  private totalBet = 0;
  private totalWin = 0;
  private maxWin = 0;
  private hits = 0;

  private simulationCount = 1000000; // 1M

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

      writeFileSync('diamond-sim-result.json', JSON.stringify(this.finalRTPsOutput), 'utf8');
      console.log('complete result', this.gameMode);
    }
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

  private getSymbolsForCombination(combination: IDiamondsMultiplierMap): string[] {
    const shuffledSymbols = this.deterministicShuffle(Object.values(DIAMONDS_MATH.colorMap));

    const { primaryGroup, secondaryGroup } = combination;

    if (primaryGroup + secondaryGroup > 5) {
      throw new Error('Invalid combination: total symbols exceed 5');
    }

    // Create the resultant array based on primary and secondary groups
    let result: string[] = [
      ...Array(primaryGroup).fill(shuffledSymbols[0]), // Fill primary group
      ...Array(secondaryGroup).fill(shuffledSymbols[1]), // Fill secondary group
    ];

    // Add unique symbols to fill up to 5 slots
    const remainingSymbols = shuffledSymbols.filter((symbol) => !result.includes(symbol));
    result = [...result, ...remainingSymbols.slice(0, 5 - result.length)];

    return result;
  }

  private async sim(nonce: number) {
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      this.serverSeed,
      this.clientSeed,
      nonce,
      GameCodes.DIAMONDS,
    );

    this.totalBet += this.betAmount;

    const gemsCount = {}; // It will keep the count of number of occurrence of each type of gems

    const result: string[] = [];
    for (const curr of generatedTarget) {
      const gemType = Math.trunc(curr);
      gemsCount[gemType] = (gemsCount[gemType] || 0) + 1;
      result.push(DIAMONDS_MATH.colorMap[gemType]);
    }

    let payoutInfo;

    switch (Object.keys(gemsCount).length) {
      case 5: //All 5 different diamonds
        payoutInfo = DIAMONDS_MATH[this.gameMode].multiplierMap[6];
        break;
      case 1: // All 5 same diamonds
        payoutInfo = DIAMONDS_MATH[this.gameMode].multiplierMap[0];
        break;
      case 4: // 1 pair and 3 different diamonds
        payoutInfo = DIAMONDS_MATH[this.gameMode].multiplierMap[5];
        break;
      case 2: // [3 common and 2 common gems] OR [4 common and 1 different gems]
        payoutInfo = Object.keys(gemsCount)?.find((el) => gemsCount[el] === 4)
          ? DIAMONDS_MATH[this.gameMode].multiplierMap[1]
          : DIAMONDS_MATH[this.gameMode].multiplierMap[2];
        break;
      case 3: // [3 common and 2 different gems] OR [2 pair of common gems and 1 different gems]
        payoutInfo = Object.keys(gemsCount)?.find((el) => gemsCount[el] === 3)
          ? DIAMONDS_MATH[this.gameMode].multiplierMap[3]
          : DIAMONDS_MATH[this.gameMode].multiplierMap[4];
        break;
      default:
    }

    // const multiplierMap = DIAMONDS_MATH[this.gameMode].multiplierMap;

    // const weights = {};

    // for (let index = 0; index < multiplierMap.length; index++) {
    //   weights[index] = multiplierMap[index].weight;
    // }

    // const selectedSymbol = await this.commonService.selectSymbolFromWeight(weights);
    // const combination: IDiamondsMultiplierMap = multiplierMap[selectedSymbol.selectedSymbol];

    // const result = this.getSymbolsForCombination(combination);

    const winAmount = payoutInfo.multiplier * this.betAmount;

    if (winAmount > 0) {
      this.hits++;
    }

    this.totalWin += winAmount;

    if (winAmount > this.maxWin) {
      this.maxWin = winAmount;
    }
  }

  roundOff = (val: number) => round(val * 100, 2);

  private createMath() {
    const finalData: DiamondsMath = {
      [GameMode.ONE]: { rtp: 99, multiplierMap: [] },
      [GameMode.THREE]: { rtp: 97, multiplierMap: [] },
      [GameMode.FIVE]: { rtp: 95, multiplierMap: [] },
      [GameMode.SEVEN]: { rtp: 93, multiplierMap: [] },
      colorMap: {
        0: 'green',
        1: 'purple',
        2: 'yellow',
        3: 'red',
        4: 'cyan',
        5: 'pink',
        6: 'blue',
      },
    };

    const workbook = XLSX.readFile('./maths/Diamond.xlsx');
    const worksheet = workbook.Sheets['Diamond_3RTPCombined'];

    const colMap = {
      [GameMode.ONE]: 'B5:E11',
      [GameMode.THREE]: 'H5:K11',
      [GameMode.FIVE]: 'N5:Q11',
      [GameMode.SEVEN]: 'T5:W11',
    };

    for (const gameMode in colMap) {
      if (Object.prototype.hasOwnProperty.call(colMap, gameMode)) {
        const col = colMap[gameMode];

        const data = getRangeData(worksheet, col, false, false);
        finalData[gameMode].multiplierMap.push(
          {
            primaryGroup: 5,
            secondaryGroup: 0,
            multiplier: Number(data[0][1]),
            probability: this.roundOff(Number(data[0][3])),
            weight: Number(data[0][2]),
          },
          {
            primaryGroup: 4,
            secondaryGroup: 0,
            multiplier: Number(data[1][1]),
            probability: this.roundOff(Number(data[1][3])),
            weight: Number(data[1][2]),
          },
          {
            primaryGroup: 3,
            secondaryGroup: 2,
            multiplier: Number(data[2][1]),
            probability: this.roundOff(Number(data[2][3])),
            weight: Number(data[2][2]),
          },
          {
            primaryGroup: 3,
            secondaryGroup: 0,
            multiplier: Number(data[3][1]),
            probability: this.roundOff(Number(data[3][3])),
            weight: Number(data[3][2]),
          },
          {
            primaryGroup: 2,
            secondaryGroup: 2,
            multiplier: Number(data[4][1]),
            probability: this.roundOff(Number(data[4][3])),
            weight: Number(data[4][2]),
          },
          {
            primaryGroup: 2,
            secondaryGroup: 0,
            multiplier: Number(data[5][1]),
            probability: this.roundOff(Number(data[5][3])),
            weight: Number(data[5][2]),
          },
          {
            primaryGroup: 0,
            secondaryGroup: 0,
            multiplier: Number(data[6][1]),
            probability: this.roundOff(Number(data[6][3])),
            weight: Number(data[6][2]),
          },
        );
      }
    }

    writeFile('diamondMath.json', JSON.stringify(finalData, null, 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('complete');
    });
  }
}
