import { Injectable } from '@nestjs/common';
import { MonitoringService } from '@provfair/monitoring';
import { InjectRedis, Redis, RedisDatabase } from '@provfair/redis';
import { CatchAll } from '@provfair/shared/decorators';
import { IAddToSetCacheInput } from './interfaces/add-to-set.interface';
import { IPushToListCacheInput } from './interfaces/push-to-list-cache-input.interface';
import { ISetCacheInput } from './interfaces/set-cache-input.interface';

@Injectable()
export class CacheService {
  constructor(
    private readonly monitor: MonitoringService,
    @InjectRedis(RedisDatabase.CACHE_L1) public readonly redis: Redis,
  ) {}

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in setCache', { error });

    return false;
  })
  public async setCache<T>(input: ISetCacheInput<T>): Promise<boolean> {
    const { data, expire, key } = input;

    // this.monitor.info('START set cache', { data: { key, expire } });

    const value = JSON.stringify(data);

    if (expire === 0) {
      await this.redis.set(key, value);
    } else {
      await this.redis.setex(key, expire, value);
    }

    // this.monitor.info('END set cache', { data: { key, expire, size: value?.length } });

    return true;
  }

  @CatchAll((error, ctx): void => {
    ctx?.monitor?.error('Handle exception in getCache', { error });
  })
  public async getCache<T>(key: string): Promise<T | undefined> {
    // this.monitor.info(`START cache retrieve`, { data: { key } });
    const data = await this.redis.get(key);

    if (!data) {
      // this.monitor.info('END cache retrieve, not found', { data: { key } });

      return undefined;
    }

    const cache = JSON.parse(data);

    // this.monitor.info('END cache retrieve', { data: { key } });

    return cache;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in delCache', { error });

    return false;
  })
  public async delCache(key: string): Promise<boolean> {
    // this.monitor.info('START del cache', { data: { key } });

    await this.redis.unlink(key);

    // this.monitor.info('END del cache', { data: { key } });

    return true;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in batchDelete', { error });

    return false;
  })
  public async batchDelete(pattern: string): Promise<boolean> {
    this.monitor.info('START batchDelete cache', { data: { pattern } });

    const keys = await this.redis.keys(pattern);

    if (!keys.length) {
      return true;
    }

    await this.redis.unlink(keys);

    this.monitor.info('END batchDelete cache', { data: { pattern } });

    return true;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in pushToList', { error });

    return false;
  })
  public async pushToList(input: IPushToListCacheInput<string | number>): Promise<number> {
    const { pushType = 'rpush', elements, key, expire = 0 } = input;

    const len = await this.redis[pushType](key, ...elements);

    if (expire > 0) {
      await this.redis.expire(key, expire);
    }

    return len;
  }

  /**
   * Fetch data from list, by default returns full list
   * @param input
   * @returns
   */
  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in getList', { error });

    return false;
  })
  public async getList(input: { key: string; start?: number; stop?: number }): Promise<string[]> {
    const { key, start = 0, stop = -1 } = input;

    const data = await this.redis.lrange(key, start, stop);

    return data;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in remListElementByIndex', { error });

    return false;
  })
  public async removeListElementByIndex(input: { key: string; index: number }): Promise<boolean> {
    const { key, index } = input;

    // don't use stuffs like Promise.all here, as this needs to be run one by one.
    await this.redis.lset(key, index, '__DELETE__');
    await this.redis.lrem(key, 1, '__DELETE__');

    return true;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in getElementFromList', { error });

    return false;
  })
  public async getElementFromList<T>(input: { key: string; index: number }): Promise<T> {
    const { key, index } = input;

    const data = await this.redis.lindex(key, index);

    if (!data) {
      return undefined;
    }

    const cache = JSON.parse(data);

    return cache;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in batchGet', { error });

    return false;
  })
  /**
   * Get multiple values selected by pattern
   * NON-BLOCKING
   * @param pattern - Pattern to search
   * @param limit - Limit amount of fetched values (Default: 20)
   */
  public async getByPattern<T>(pattern: string, count = 20): Promise<T[]> {
    this.monitor.info('START getByPattern cache', { data: { pattern } });

    let cache: T[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const fixedKeys of this.scanByPattern(pattern, count)) {
      const rawDataArray = await Promise.all(fixedKeys.map(async (k) => this.redis.get(k)));
      const cacheDataArray = rawDataArray.map((d) => JSON.parse(d));
      cache = cache.concat(cacheDataArray);
    }

    this.monitor.info('END getByPattern cache', { data: { pattern } });

    return cache;
  }

  /**
   * Delete multiple values selected by pattern
   * NON-BLOCKING
   * @param pattern - Pattern to search
   * @param count - Limit amount of fetched values (Default: 1000)
   * @example
   *   cacheService.deleteByPattern("aviatorx:1:*", 10)
   */
  public async deleteByPattern(pattern: string, count = 1000): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for await (const fixedKeys of this.scanByPattern(pattern, count)) {
      await this.redis.unlink(fixedKeys);
    }
  }

  private async *scanByPattern(pattern: string, count = 1000): AsyncGenerator<string[]> {
    let cursor = '0';

    const reply = await this.redis.scan(
      cursor,
      'MATCH',
      `${this.redis.options.keyPrefix ?? ''}${pattern}`,
      'COUNT',
      count,
    );
    [cursor] = reply;

    if (reply[1]?.length > 0) {
      const fixedKeys = !this.redis.options.keyPrefix
        ? reply[1]
        : reply[1].map((e) => e.replace(this.redis.options.keyPrefix, ''));
      yield fixedKeys;
    }
  }

  public async getKeysByPattern(pattern: string) {
    return new Promise<string[]>((resolve, reject) => {
      const stream = this.redis.scanStream({
        // only returns keys following the pattern of "key"
        match: pattern,
        // returns approximately 100 elements per call
        count: 100,
      });

      const keys: string[] = [];
      stream.on('data', (resultKeys) => {
        // `resultKeys` is an array of strings representing key names
        for (let i = 0; i < resultKeys.length; i++) {
          keys.push(resultKeys[i]);
        }
      });

      stream.on('end', () => resolve(keys));

      stream.on('error', (err) => reject(err));
    });
  }

  public async batchDeleteByPattern(pattern: string): Promise<boolean> {
    const keys = await this.getKeysByPattern(pattern);

    return this.batchDeleteKeys(keys);
  }

  /**
   * @param key string
   * @param expiry in seconds
   * @returns number
   */
  public async extendCacheExpiry(key: string, expiry: number): Promise<number> {
    return this.redis.expire(key, expiry);
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in batchDeleteKeys', { error });

    return false;
  })
  public async batchDeleteKeys(keys: string[]): Promise<boolean> {
    // this.logger.info('START batchDeleteKeys cache', { data: { keys } });

    if (!keys.length) {
      return true;
    }

    await this.redis.unlink(keys);

    return true;
  }

  // Retrieve multiple values for the given keys
  public async getCacheMulti<T>(...keys: string[]): Promise<(T | null)[]> {
    const values = await this.redis.mget(...keys);

    return values.map((value) => (value !== null ? JSON.parse(value) : null));
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in addToSet', { error });

    return 0;
  })
  public async addToSet(input: IAddToSetCacheInput): Promise<number> {
    const {
      key,
      element: { field, value },
      expire = 0,
    } = input;

    const num = await this.redis.hset(key, field, value);

    if (expire > 0) {
      await this.redis.expire(key, expire);
    }

    return num;
  }

  /**
   * Fetch full set, all data inside set
   * @param input
   * @returns
   */
  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in getSet', { error });

    return new Map();
  })
  public async getSet<T>(input: { key: string; limit?: number }): Promise<Map<string, T>> {
    const { key, limit } = input;

    let cursor = '0';
    const allRecs: Map<string, T> = new Map();
    let fetchedCount = 0;

    do {
      // HSCAN command to fetch a batch of fields and values
      const [newCursor, resultKeys] = await this.redis.hscan(key, cursor);

      for (let i = 0; i < resultKeys.length; i += 2) {
        if (limit !== undefined && fetchedCount >= limit) {
          cursor = '0'; // Stop scanning if limit is reached
          break;
        }

        const field = resultKeys[i];

        const detailsString = resultKeys[i + 1];
        const details: T = JSON.parse(detailsString);
        allRecs.set(field, details);
        fetchedCount++;
      }

      cursor = newCursor;
    } while (cursor !== '0' && (limit === undefined || fetchedCount < limit));

    return allRecs;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in removeFromSet', { error });

    return false;
  })
  public async removeFromSet(input: { key: string; field: string }): Promise<boolean> {
    const { key, field } = input;

    await this.redis.hdel(key, field);

    return true;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in getElementFromSet', { error });

    return false;
  })
  public async getElementFromSet<T>(input: { key: string; field: string }): Promise<T> {
    const { key, field } = input;

    const data = await this.redis.hget(key, field);

    if (!data) {
      return undefined;
    }

    const cache = JSON.parse(data);

    return cache;
  }
}
