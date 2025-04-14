import { CacheModule as NestJsCacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { LocalCacheService } from './localCache.service';

@Global()
@Module({
  imports: [NestJsCacheModule.register()],
  providers: [LocalCacheService],
  exports: [LocalCacheService],
})
export class LocalCacheModule {}
