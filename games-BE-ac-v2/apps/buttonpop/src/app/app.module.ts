import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppConfigModule } from '@provfair/configuration/app';
import { CacheModule } from '@provfair/modules/cache/cache.module';
import { ResponseBuilderModule } from '@provfair/modules/responseBuilder/responseBuilder.module';
import { MonitoringModule } from '@provfair/monitoring';
import { DatabaseModule } from 'libs/modules/database';
import { HealthController } from '../controllers/health.controller';
import { ButtonPopModule } from '../domain/buttonpop.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    TerminusModule,
    MonitoringModule,
    CacheModule,
    ButtonPopModule,
    ResponseBuilderModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
