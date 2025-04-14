import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MonitoringService } from '@provfair/monitoring';
import { OVERANDOUT_QUEUE } from '@provfair/shared/constants/Queue';
import { QueueJobs } from '@provfair/shared/enums';
import { Job } from 'bullmq';
import { OverAndOutService } from '../overandout.service';

@Processor(OVERANDOUT_QUEUE)
export class Consumer extends WorkerHost {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly service: OverAndOutService,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    try {
      switch (job.name) {
        case QueueJobs.OVERANDOUT_SETTLE_BET:
          await this.service.autoSettleBet(job.data);
          break;
      }
    } catch (error) {
      this.monitor.error('Error processing overandout queue', { error, data: { name: job.name, data: job.data } });
    }
  }
}
