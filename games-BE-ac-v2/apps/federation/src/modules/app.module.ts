import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '@provfair/configuration/app';
import { FederationConfigModule } from '@provfair/configuration/federation';
import { MonitoringModule } from '@provfair/monitoring';
import { HealthController } from '../controllers/health.controller';
import { FederationModule } from './federation.module';

@Module({
  imports: [AppConfigModule, FederationConfigModule, FederationModule, MonitoringModule, HttpModule],
  controllers: [HealthController],
})
export class AppModule {}
