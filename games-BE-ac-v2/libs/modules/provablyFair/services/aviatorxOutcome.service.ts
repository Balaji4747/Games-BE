import { Injectable } from '@nestjs/common';
import { GameMode } from '@provfair/shared/enums/gameModes.enum';
import { createHash } from 'crypto';

@Injectable()
export class AviatorxOutcomeService {
  public async generateGameOutcome(
    serverCode: string,
    playerClientCode: string,
    gameMode: GameMode,
    maxMultiplierCap: number = 0,
  ): Promise<{ multiplier: number; hash: string }> {
    const hash = this.generateHash(serverCode.concat(playerClientCode));
    const hexValue = hash.slice(0, 13);
    const decimalValue = parseInt(hexValue, 16);

    let multiplier: number;
    if (parseInt(hash, 16) % (Number(gameMode) * 10) === 0) {
      multiplier = 1;
    } else {
      const e = 2 ** 52;
      multiplier = Number((100 * e - decimalValue) / (e - decimalValue) / 100);
    }

    if (multiplier < 1) {
      multiplier = 1;
    }

    multiplier = maxMultiplierCap > 0 && maxMultiplierCap < multiplier ? maxMultiplierCap : multiplier;

    return { multiplier, hash };
  }

  public generateHash(hash: string, hmac: string = 'sha512'): string {
    // generate a hmac sha512 hash of the server seed.
    const _hash = createHash(hmac);
    _hash.update(hash);
    return _hash.digest('hex');
  }
}
