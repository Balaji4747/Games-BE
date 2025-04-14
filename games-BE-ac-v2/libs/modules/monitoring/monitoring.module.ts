import { Global, Module } from '@nestjs/common';
import { AppLoggerModule } from '@provfair/logger';
import { MonitoringService } from './monitoring.service';

@Global()
@Module({
  imports: [AppLoggerModule],
  providers: [MonitoringService],
  exports: [MonitoringService],
})
export class MonitoringModule {}
