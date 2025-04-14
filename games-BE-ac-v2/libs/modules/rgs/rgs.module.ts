import { Global, Module } from '@nestjs/common';
import { RGSConfigModule } from '@provfair/configuration/rgs';
import { MonitoringModule } from '@provfair/monitoring';
import RgsService from './rgs.service';

@Global()
@Module({
  imports: [MonitoringModule, RGSConfigModule],
  providers: [RgsService],
  exports: [RgsService],
})
export class RGSModule {}
