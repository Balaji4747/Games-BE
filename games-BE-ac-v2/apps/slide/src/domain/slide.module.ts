import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';
import { LocalCacheModule } from '@provfair/modules/local-cache/localCache.module';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { PLAYERS_SERVICE } from '@provfair/shared/constants/MicroServiceClients';
import { PLAYERS_QUEUE_CONFIG } from '@provfair/shared/constants/Queue';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GameSeeds, GameSeedsSchema } from '@provfair/shared/schemas/gameSeeds.schema';
import { GqlModule } from 'libs/modules/graphql';
import { SlideHashCode, SlideHashCodeSchema } from './schema/slideHashCode.schema';
import { SlideRound, SlideRoundSchema } from './schema/slideRound.schema';
import { SlideQueriesResolver } from './slide.resolver';
import { SlideService } from './slide.service';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    MongooseModule.forFeature([
      { name: SlideRound.name, schema: SlideRoundSchema },
      { name: SlideHashCode.name, schema: SlideHashCodeSchema },
      { name: GameSeeds.name, schema: GameSeedsSchema },
    ]),
    RGSModule,
    ProvablyFairModule,
    ScheduleModule.forRoot(),
    BullModule.registerQueueAsync(PLAYERS_QUEUE_CONFIG),
    ClientsModule.registerAsync([
      {
        name: PLAYERS_SERVICE,
        imports: [RedisClientConfigModule],
        inject: [RedisClientConfigService],
        useFactory: (redisConfig: RedisClientConfigService) => {
          return { transport: Transport.REDIS, options: redisConfig.redis };
        },
      },
    ]),
    LocalCacheModule,
  ],
  providers: [
    SlideService,
    SlideQueriesResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class SlideModule {}
