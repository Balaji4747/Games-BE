import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { writeFileSync } from 'fs';
import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'limboSim' })
export class LimboSimCommand extends CommandRunner {
  private serverSeed = 'ac8ae51a5b2ccdd79591a533e559f6a1ebe9310dacd9caca0c0cb697470bc187';
  private clientSeed = 'AQyZcmezpe2hClwucS2W';
  private betAmount = 1;
  private targetMultiplier = 2;

  private totalBet = 0;
  private totalWin = 0;
  private maxWin = 0;
  private hits = 0;

  private simulationCount = 100000000; // 100M

  private gameMode: GameMode = GameMode.FIVE;

  private finalRTPsOutput = {};

  constructor(private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService) {
    super();
  }

  async run(passedParam: string[]): Promise<void> {
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

      writeFileSync('limbo-sim-result.json', JSON.stringify(this.finalRTPsOutput), 'utf8');
      console.log('complete result', this.gameMode);
    }
  }

  private async sim(nonce: number) {
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      this.serverSeed,
      this.clientSeed,
      nonce,
      GameCodes.LIMBO,
      this.gameMode,
    );

    this.totalBet += this.betAmount;

    const outcome = Math.trunc(generatedTarget[0] * 100) / 100;

    let winAmount = 0;

    const isWinningBet = this.targetMultiplier <= outcome;
    if (isWinningBet) {
      winAmount = this.targetMultiplier * this.betAmount;
    }

    if (winAmount > 0) {
      this.hits++;
    }

    this.totalWin += winAmount;

    if (winAmount > this.maxWin) {
      this.maxWin = winAmount;
    }
  }
}
