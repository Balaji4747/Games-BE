import { Injectable } from '@nestjs/common';
import { LocalCacheService } from '@provfair/modules/local-cache/localCache.service';
import { MonitoringService } from '@provfair/monitoring';
import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';
import { CommonService } from '@provfair/shared/services/common.service';
import { createHash } from 'crypto';
import { Model } from 'mongoose';

@Injectable()
export class PreGenerateServerCodeService extends CommonService {
  constructor(
    private readonly logger: MonitoringService,
    private readonly localCacheService: LocalCacheService,
  ) {
    super();
  }

  public async generateSeverCodes(
    gameCode: GameCodes,
    collection: Model<any>,
    initialHash?: string,
    isDeleteOldHash = true,
    totalHashes = 30000000,
  ) {
    if (
      ![GameCodes.CRASH, GameCodes.SLIDE, GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP].includes(gameCode)
    ) {
      return;
    }

    this.logger.info('===generateHashCodes started for game ===', { data: gameCode });

    if (isDeleteOldHash) {
      collection
        .deleteMany({ isUsed: true })
        .catch((e) => this.logger.error(`Error deleting ${gameCode} used hash codes:`, { error: e }));
    }

    const batchSize = 10000;
    let prevHash = initialHash;

    if (!prevHash) {
      const hash = createHash('sha256');
      prevHash = hash.digest('hex');
    }

    let operations = [];

    console.time('Hash Generation and Insertion');

    for (let i = 0; i < totalHashes; i++) {
      const hash = createHash('sha256');
      hash.update(prevHash);
      const newHash = hash.digest('hex');

      if ([GameCodes.AVIATORX].includes(gameCode)) {
        operations.push({
          insertOne: {
            document: {
              serverSeed: await this.generateRandomCode(14),
              hashedServerSeed: newHash,
              order: i + 1,
              isUsed: false,
            },
          },
        });
      } else {
        operations.push({
          insertOne: {
            document: {
              hash: newHash,
              isUsed: false,
              order: i + 1,
            },
          },
        });
      }

      if ((i + 1) % batchSize === 0) {
        await collection.bulkWrite(operations, { ordered: false });
        operations = [];
        this.logger.info(`Inserted ${i + 1} hashes...`);
      }

      prevHash = newHash;
    }

    // Insert any remaining operations
    if (operations.length > 0) {
      await collection.bulkWrite(operations, { ordered: false });
    }

    console.timeEnd('Hash Generation and Insertion');
    this.logger.info(`Successfully inserted ${totalHashes} hashes for game: ${gameCode}.`);
  }

  public async getSeeds<T>(collection: Model<any>, gameCode: GameCodes, count = 1): Promise<T[]> {
    const seeds = await this.localCacheService.getCache<T[]>(`${gameCode}/seeds`);

    if (seeds?.length && seeds?.length > count) {
      this.logger.debug(`${gameCode} Seeds found in cache.`);

      const seedsToReturn = seeds.splice(0, count);

      await this.localCacheService.setCache({ key: `${gameCode}/seeds`, data: seeds, expire: 0 });

      return seedsToReturn;
    }

    this.logger.debug(`${gameCode} Seeds not found in cache, retrieving from DB`);

    let gameSeeds = await collection.find({ isUsed: false }).limit(500).lean();

    if (gameSeeds?.length < count) {
      await this.generateSeverCodes(gameCode, collection, null, false, 20000);

      gameSeeds = await collection.find({ isUsed: false }).limit(500).lean();
    }

    const seedsToReturn = gameSeeds.splice(0, count);

    await this.localCacheService.setCache({ key: `${gameCode}/seeds`, data: gameSeeds, expire: 0 });

    this.logger.debug(`${gameCode} Seeds retrieved from DB and updated cache`);

    return seedsToReturn;
  }
}
