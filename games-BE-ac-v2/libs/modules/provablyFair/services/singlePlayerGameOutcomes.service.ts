import { Injectable } from '@nestjs/common';
import {
  GAME_OUTCOME_MULTIPLIER,
  HOUSE_EDGE_CONVERSION,
  MAX_RAW_OUTCOMES,
  TOTAL_OUTCOMES,
} from '@provfair/shared/constants/ProbablyFairOutcomes';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { createHmac } from 'crypto';

@Injectable()
export class SinglePlayerGameOutcomeService {
  public async generateGameOutcomes(
    serverSeed: string,
    clientSeed: string,
    nonce: number,
    game: GameCodes,
    gameMode?: GameMode, // For now only limbo will send this gameMode
  ): Promise<number[]> {
    const hashesRequired = Math.ceil(TOTAL_OUTCOMES[game] / 8);
    const hashes = [];
    for (let i = 0; i < hashesRequired; i++) {
      const hash = await this.generateHash(serverSeed, clientSeed, nonce, i);
      hashes.push(hash);
    }
    const hashesInDecimal = [].concat(
      ...hashes.map((hash) => {
        let index = 0;
        const decimalNumbers = [];
        while (index < 32) {
          decimalNumbers.push(Number(hash[index]));
          index += 1;
        }
        return decimalNumbers;
      }),
    );
    //  convert the decimal bytes array to a floating point numbers array
    let gameOutcomes = [];
    if ([GameCodes.MINES, GameCodes.BOTTLESMASH, GameCodes.OVERANDOUT].includes(game)) {
      gameOutcomes = await this.bytesToFloatingPoint2(hashesInDecimal, game);
    } else if (game === GameCodes.LIMBO) {
      gameOutcomes = await this.bytesToFloatingPoint1(hashesInDecimal, game);
      const finalOutcome = await this.rawToEdgedOutcome(gameOutcomes[0], game, gameMode);
      return [finalOutcome];
    } else {
      gameOutcomes = await this.bytesToFloatingPoint1(hashesInDecimal, game);
    }
    return gameOutcomes.slice(0, TOTAL_OUTCOMES[game]);
  }

  public async generateHash(serverSeed: string, clientSeed: string, nonce: number, cursor: number): Promise<Buffer> {
    // generate a hmac sha256 hash of the server seed.
    const hash = createHmac('sha256', serverSeed);
    // update client seed and nonce and currentRound
    hash.update(`${clientSeed}:${nonce}:${cursor}`);
    return hash.digest();
  }

  // bytesToFloatingPoint1 is used for games dice, hilo,
  public async bytesToFloatingPoint1(bytes: any, game: GameCodes): Promise<number[]> {
    // Split bytes into chunks of 4
    const chunkSize = 4;
    const chunks: number[][] = [];

    for (let i = 0; i < bytes.length; i += chunkSize) {
      chunks.push(bytes.slice(i, i + chunkSize));
    }

    // Convert each chunk to a floating point number
    const rand = chunks.map((chunk) => {
      return (
        Number(
          chunk.reduce((result, value, index) => {
            const divider = 256 ** (index + 1);
            const partialResult = Number(value) / divider;
            return result + partialResult;
          }, 0),
        ) * GAME_OUTCOME_MULTIPLIER[game]
      );
    });

    return rand;
  }

  // bytesToFloatingPoint2 used for games like mine
  public async bytesToFloatingPoint2(bytes: any, game: GameCodes): Promise<number[]> {
    // Mines game have a variable game outcome multiplier, starts from 25 and decreases by 1 for each outcome
    let variableMultiplier = GAME_OUTCOME_MULTIPLIER[game] + 1;
    const chunkSize = 4;
    const chunks: number[][] = [];

    for (let i = 0; i < bytes.length; i += chunkSize) {
      chunks.push(bytes.slice(i, i + chunkSize));
    }

    // Convert each chunk to a floating point number with variable multiplier
    const rand = chunks.map((chunk) => {
      variableMultiplier -= 1;
      return (
        Number(
          chunk.reduce((result, value, index) => {
            const divider = 256 ** (index + 1);
            const partialResult = Number(value) / divider;
            return result + partialResult;
          }, 0),
        ) * variableMultiplier
      );
    });

    return rand;
  }

  // raw to edged outcome
  public async rawToEdgedOutcome(rawOutcome: number, game: GameCodes, gameMode: GameMode): Promise<number> {
    const maxRawOutcome = MAX_RAW_OUTCOMES[game];
    const outcome = (maxRawOutcome / (rawOutcome + 1)) * (1 - HOUSE_EDGE_CONVERSION[gameMode]);
    return outcome;
  }
}
