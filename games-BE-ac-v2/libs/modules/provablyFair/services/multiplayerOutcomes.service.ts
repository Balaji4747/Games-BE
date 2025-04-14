/**
 * @dev This file contains the logic for the multiplayer outcomes like Crash and Slide.
 */
import { Injectable } from '@nestjs/common';
import { HOUSE_EDGE_CONVERSION, MAX_RAW_OUTCOMES } from '@provfair/shared/constants/ProbablyFairOutcomes';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class MultiplayerGameOutcomeService {
  constructor() {}

  public async generateGameOutcomes(
    hashCode: string,
    seed: string,
    game: GameCodes,
    gameMode: GameMode,
    maxMultiplierCap: number = 0,
  ) {
    const hash = await this.generateHash(hashCode, seed);
    const hashInDecimal: number[] = [];
    for (let i = 0; i < 32; i++) {
      hashInDecimal.push(Number(hash[i]));
    }
    //  convert the decimal bytes array to a floating point numbers array
    const rawOutcome = await this.bytesToFloatingPoint(hashInDecimal.slice(0, 4));
    const edgedOutcome = await this.rawToEdgedOutcome(rawOutcome, game, gameMode, maxMultiplierCap);

    return edgedOutcome;
  }

  public async generateHash(serverSeed: string, clientSeed: string): Promise<Buffer> {
    // generate a hmac sha256 hash of the server seed.
    const hash = createHmac('sha256', serverSeed);
    // update client seed and nonce and currentRound
    hash.update(`${clientSeed}`);
    return hash.digest();
  }

  private async bytesToFloatingPoint(bytes: number[]): Promise<number> {
    // Split bytes into chunks of 4
    const chunkSize = 4;
    const chunks: number[][] = [];

    for (let i = 0; i < bytes.length; i += chunkSize) {
      chunks.push(bytes.slice(i, i + chunkSize));
    }

    // Convert each chunk to a floating point number
    const rand = chunks.map((chunk) => {
      let index = 3;
      return Number(
        chunk.reduce((result, value) => {
          const multiplier = 256 ** index;
          const partialResult = Number(value) * multiplier;
          index -= 1;
          return result + partialResult;
        }, 0),
      );
    });

    return rand[0];
  }

  // raw to edged outcome
  private async rawToEdgedOutcome(
    rawOutcome: number,
    game: GameCodes,
    gameMode: GameMode,
    maxMultiplierCap: number,
  ): Promise<number> {
    const maxRawOutcome = MAX_RAW_OUTCOMES[game];

    let multiplier: number = (maxRawOutcome / (rawOutcome + 1)) * (1 - HOUSE_EDGE_CONVERSION[gameMode]);

    if (multiplier < 1) {
      multiplier = 1;
    }

    multiplier = maxMultiplierCap > 0 && maxMultiplierCap < multiplier ? maxMultiplierCap : multiplier;

    return multiplier;
  }

  // generate dummy outcomes for slide
  public async slideDummyOutcomes(count: number, gameMode = GameMode.ONE) {
    // generate a random 32 Byte hash and seed
    const hashCode = randomBytes(32).toString('hex');
    const finalResult: number[] = [];
    for (let i = 0; i < count; i++) {
      const Seed = randomBytes(32).toString('hex');
      const result = await this.generateGameOutcomes(hashCode, Seed, GameCodes.SLIDE, gameMode);
      finalResult.push(result);
    }
    return finalResult;
  }
}
