import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@provfair/configuration/app';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { MonitoringModule } from '@provfair/monitoring';
import { DatabaseModule } from 'libs/modules/database';
import { HealthController } from '../controllers/health.controller';
import { LimboModule } from '../domain/limbo.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, TerminusModule, MonitoringModule, CacheModule, LimboModule],
  controllers: [HealthController],
})
export class AppModule {}
