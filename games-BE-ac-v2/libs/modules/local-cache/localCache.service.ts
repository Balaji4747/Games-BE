import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CatchAll } from '@provfair/shared/decorators';
import { Cache } from 'cache-manager';
import { ISetLocalCacheInput } from './interfaces/set-local-cache-input.interface';

@Injectable()
export class LocalCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in LocalCacheService:setCache', { error });

    return false;
  })
  public async setCache<T>(input: ISetLocalCacheInput<T>): Promise<boolean> {
    const { data, key } = input;
    let { expire } = input;

    if (expire > 0) {
      expire = expire * 1000;
    }

    await this.cacheManager.set(key, data, expire);

    return true;
  }

  @CatchAll((error, ctx): void => {
    ctx?.monitor?.error('Handle exception in LocalCacheService:getCache', { error });
  })
  public async getCache<T>(key: string): Promise<T | undefined> {
    const data = await this.cacheManager.get<T>(key);

    if (!data) {
      return undefined;
    }

    return data;
  }

  @CatchAll((error, ctx) => {
    ctx?.monitor?.error('Handle exception in LocalCacheService:delCache', { error });

    return false;
  })
  public async delCache(key: string): Promise<boolean> {
    await this.cacheManager.del(key);

    return true;
  }
}
