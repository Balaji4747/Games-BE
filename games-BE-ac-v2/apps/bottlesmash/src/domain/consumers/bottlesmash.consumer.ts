import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MonitoringService } from '@provfair/monitoring';
import { BOTTLESMASH_QUEUE } from '@provfair/shared/constants/Queue';
import { QueueJobs } from '@provfair/shared/enums';
import { Job } from 'bullmq';
import { BottleSmashService } from '../bottlesmash.service';

@Processor(BOTTLESMASH_QUEUE)
export class Consumer extends WorkerHost {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly service: BottleSmashService,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    try {
      switch (job.name) {
        case QueueJobs.BOTTLESMASH_SETTLE_BET:
          await this.service.autoSettleBet(job.data);
          break;
      }
    } catch (error) {
      this.monitor.error('Error processing bottlesmash queue', { error, data: { name: job.name, data: job.data } });
    }
  }
}
