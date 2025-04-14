import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class UserSeedsService {
  constructor() {}

  public generateNewServerSeed(): { serverSeed: string; hashedServerSeed: string } {
    const serverSeed = randomBytes(32).toString('hex');

    const hash = createHash('sha256');
    hash.update(serverSeed);
    const hashedServerSeed = hash.digest('hex');

    return { serverSeed, hashedServerSeed };
  }
}
