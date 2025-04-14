import { CacheModule as NestJsCacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';
import { MonitoringModule } from '@provfair/monitoring';
import { RedisDatabase, RedisModule } from '@provfair/redis';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    MonitoringModule,
    NestJsCacheModule.register(),
    RedisModule.forRootAsync(
      {
        imports: [RedisClientConfigModule],
        inject: [RedisClientConfigService],
        useFactory: (config: RedisClientConfigService) => {
          return config.redis;
        },
      },
      RedisDatabase.CACHE_L1,
    ),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
