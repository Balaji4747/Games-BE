import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { DiceMutationResolver, DiceQueriesResolver } from './dice.resolver';
import { DiceService } from './dice.service';

@Module({
  imports: [
    GqlModule.forRoot(),
    SocketIOEmitterModule,
    ProvablyFairModule,
    RGSModule,
    UsersModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    DiceService,
    DiceQueriesResolver,
    DiceMutationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class DiceModule {}
