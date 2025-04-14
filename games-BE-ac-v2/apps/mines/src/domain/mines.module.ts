import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { MINES_QUEUE_CONFIG } from '@provfair/shared/constants/Queue';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { MinesConsumer } from './consumers/mines.consumer';
import { MinesMutationResolver, MinesQueriesResolver } from './mines.resolver';
import { MinesService } from './mines.service';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    ProvablyFairModule,
    RGSModule,
    UsersModule,
    BullModule.registerQueueAsync(MINES_QUEUE_CONFIG),
  ],
  providers: [
    MinesService,
    MinesQueriesResolver,
    MinesMutationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    MinesConsumer,
  ],
})
export class MinesModule {}
