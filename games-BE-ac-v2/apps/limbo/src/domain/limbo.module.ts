import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { LocalCacheModule } from '@provfair/modules/local-cache/localCache.module';
import { ProvablyFairModule } from '@provfair/modules/provablyFair/provablyFair.module';
import { RGSModule } from '@provfair/modules/rgs/rgs.module';
import { SocketIOEmitterModule } from '@provfair/modules/socketEmitter/socketEmitter.module';
import { UsersModule } from '@provfair/modules/user/users.module';
import { AuthGuard } from '@provfair/shared/guards/auth.guard';
import { GqlModule } from 'libs/modules/graphql';
import { LimboMutationResolver } from './limbo.resolver';
import { LimboService } from './limbo.service';

@Module({
  imports: [GqlModule.forRoot(), SocketIOEmitterModule, ProvablyFairModule, RGSModule, UsersModule, LocalCacheModule],
  providers: [
    LimboService,
    LimboMutationResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class LimboModule {}
