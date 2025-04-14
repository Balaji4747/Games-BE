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
import { ButtonPopQueriesResolver } from './buttonpop.resolver';
import { ButtonPopService } from './buttonpop.service';
import { ButtonPopHashCode, ButtonPopHashCodeSchema } from './schema/buttonpopHashCode.schema';
import { ButtonPopRound, ButtonPopRoundSchema } from './schema/buttonpopRounds.schema';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    MongooseModule.forFeature([
      { name: ButtonPopRound.name, schema: ButtonPopRoundSchema },
      { name: ButtonPopHashCode.name, schema: ButtonPopHashCodeSchema },
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
    ButtonPopService,
    ButtonPopQueriesResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ButtonPopModule {}
