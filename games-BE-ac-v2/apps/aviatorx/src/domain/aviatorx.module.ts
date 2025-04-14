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
import { GqlModule } from 'libs/modules/graphql';
import { AviatorxQueriesResolver } from './aviatorx.resolver';
import { AviatorxService } from './aviatorx.service';
import { AviatorxRound, AviatorxRoundSchema } from './schema/aviatorxRounds.schema';
import { AviatorxServerCodes, AviatorxServerCodesSchema } from './schema/aviatorxServerCode.schema';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    MongooseModule.forFeature([
      { name: AviatorxRound.name, schema: AviatorxRoundSchema },
      { name: AviatorxServerCodes.name, schema: AviatorxServerCodesSchema },
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
    AviatorxService,
    AviatorxQueriesResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AviatorxModule {}
