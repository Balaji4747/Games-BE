import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { OVERANDOUT_QUEUE_CONFIG } from '@provfair/shared/constants/Queue';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { Consumer } from './consumers/overandout.consumer';
import { OverAndOutMutationResolver, OverAndOutQueriesResolver } from './overandout.resolver';
import { OverAndOutService } from './overandout.service';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    ProvablyFairModule,
    RGSModule,
    UsersModule,
    BullModule.registerQueueAsync(OVERANDOUT_QUEUE_CONFIG),
  ],
  providers: [
    OverAndOutService,
    OverAndOutQueriesResolver,
    OverAndOutMutationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    Consumer,
  ],
})
export class OverAndOutModule {}
