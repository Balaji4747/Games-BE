import { Global, Module } from '@nestjs/common';
import { MonitoringModule } from '@provfair/monitoring';
import { ValidatorService } from './validator.service';

@Global()
@Module({
  imports: [MonitoringModule],
  providers: [ValidatorService],
  exports: [ValidatorService],
})
export class ValidatorModule {}
