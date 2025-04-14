import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { DiamondMutationResolver, DiamondQueriesResolver } from './diamonds.resolver';
import { DiamondsService } from './diamonds.service';

@Module({
  imports: [GqlModule.forRoot(), SocketIOEmitterModule, ProvablyFairModule, RGSModule, UsersModule],
  providers: [
    DiamondsService,
    DiamondQueriesResolver,
    DiamondMutationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class DiamondModule {}
