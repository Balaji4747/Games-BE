import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { BOTTLESMASH_QUEUE_CONFIG } from '@provfair/shared/constants/Queue';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { BottleSmashMutationResolver, BottleSmashQueriesResolver } from './bottlesmash.resolver';
import { BottleSmashService } from './bottlesmash.service';
import { Consumer } from './consumers/bottlesmash.consumer';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    ProvablyFairModule,
    RGSModule,
    UsersModule,
    BullModule.registerQueueAsync(BOTTLESMASH_QUEUE_CONFIG),
  ],
  providers: [
    BottleSmashService,
    BottleSmashQueriesResolver,
    BottleSmashMutationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Consumer,
  ],
})
export class BottleSmashModule {}
