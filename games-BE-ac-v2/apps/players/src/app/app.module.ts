import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@provfair/configuration/app';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';
import { RedlockClientConfigModule } from '@provfair/configuration/redlock-client/configuration.module';
import { RedlockClientConfigService } from '@provfair/configuration/redlock-client/configuration.service';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { RedlockClientModule } from '@provfair/modules/redlock/redlock-client.module';
import { ResponseBuilderModule } from '@provfair/modules/responseBuilder/responseBuilder.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { MonitoringModule } from '@provfair/monitoring';
import { RedisModule } from '@provfair/redis';
import { PLAYERS_QUEUE_CONFIG } from '@provfair/shared/constants/Queue';
import { DatabaseModule } from 'libs/modules/database';
import { HealthController } from '../controllers/health.controller';
import { PlayersController } from '../controllers/players.controller';
import { PlayersModule } from '../domain/players.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TerminusModule,
    MonitoringModule,
    PlayersModule,
    CacheModule,
    RedisModule.forRootAsync({
      imports: [RedisClientConfigModule],
      inject: [RedisClientConfigService],
      useFactory: (config: RedisClientConfigService) => {
        return config.redis;
      },
    }),
    ResponseBuilderModule,
    BullModule.registerQueueAsync(PLAYERS_QUEUE_CONFIG), // here we can pass multiple queue configs, like CRASH_CONFIG, SLIDE_CONFIG etc
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
    SocketIOEmitterModule,
    RedlockClientConfigModule,
    UsersModule,
  ],
  controllers: [HealthController, PlayersController],
})
export class AppModule {}
