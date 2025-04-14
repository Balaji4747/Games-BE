import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@provfair/configuration/app';
import { MonitoringModule } from '@provfair/monitoring';
import { DatabaseModule } from 'libs/modules/database';
import { HealthController } from '../controllers/health.controller';
import { DiamondModule } from '../domain/diamonds.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, TerminusModule, MonitoringModule, DiamondModule],
  controllers: [HealthController],
})
export class AppModule {}
