import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@provfair/configuration/app';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';
import { RedlockClientConfigModule } from '@provfair/configuration/redlock-client/configuration.module';
import { RedlockClientConfigService } from '@provfair/configuration/redlock-client/configuration.service';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { RedlockClientModule } from '@provfair/modules/redlock/redlock-client.module';
import { MonitoringModule } from '@provfair/monitoring';
import { DatabaseModule } from 'libs/modules/database';
import { HealthController } from '../controllers/health.controller';
import { OverAndOutModule } from '../domain/overandout.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TerminusModule,
    MonitoringModule,
    OverAndOutModule,
    CacheModule,
    RedlockClientModule.forRootAsync({
      imports: [RedisClientConfigModule, RedlockClientConfigModule],
      inject: [RedisClientConfigService, RedlockClientConfigService],
      useFactory: (redisConfig: RedisClientConfigService, redlockConfig: RedlockClientConfigService) => {
        return {
          redisConfigs: [redisConfig.redis],
          options: {
            retryDelay: redlockConfig.redlock.retryDelay,
            retryCount: redlockConfig.redlock.retryCount,
          },
        };
      },
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
