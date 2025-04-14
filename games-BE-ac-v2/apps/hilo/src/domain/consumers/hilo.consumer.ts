import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MonitoringService } from '@provfair/monitoring';
import { HILO_QUEUE } from '@provfair/shared/constants/Queue';
import { QueueJobs } from '@provfair/shared/enums';
import { Job } from 'bullmq';
import { HiloService } from '../hilo.service';

@Processor(HILO_QUEUE)
export class HiloConsumer extends WorkerHost {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly hiloService: HiloService,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    try {
      switch (job.name) {
        case QueueJobs.HILO_SETTLE_BET:
          await this.hiloService.autoSettleBet(job.data);
          break;
      }
    } catch (error) {
      this.monitor.error('Error processing hilo queue', { error, data: { name: job.name, data: job.data } });
    }
  }
}
