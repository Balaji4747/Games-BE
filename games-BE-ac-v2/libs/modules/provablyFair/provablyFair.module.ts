import { Global, Module } from '@nestjs/common';
import { MonitoringModule } from '@provfair/monitoring';
import { LocalCacheModule } from '../local-cache/localCache.module';
import {
  AviatorxOutcomeService,
  MultiplayerGameOutcomeService,
  PreGenerateServerCodeService,
  SinglePlayerGameOutcomeService,
  UserSeedsService,
} from './services';

@Global()
@Module({
  imports: [MonitoringModule, LocalCacheModule],
  providers: [
    UserSeedsService,
    AviatorxOutcomeService,
    PreGenerateServerCodeService,
    SinglePlayerGameOutcomeService,
    MultiplayerGameOutcomeService,
  ],
  exports: [
    UserSeedsService,
    AviatorxOutcomeService,
    PreGenerateServerCodeService,
    SinglePlayerGameOutcomeService,
    MultiplayerGameOutcomeService,
  ],
})
export class ProvablyFairModule {}
