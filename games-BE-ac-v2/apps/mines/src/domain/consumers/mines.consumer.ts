import { Processor, WorkerHost } from '@nestjs/bullmq';
import { MonitoringService } from '@provfair/monitoring';
import { MINES_QUEUE } from '@provfair/shared/constants/Queue';
import { QueueJobs } from '@provfair/shared/enums';
import { Job } from 'bullmq';
import { MinesService } from '../mines.service';

@Processor(MINES_QUEUE)
export class MinesConsumer extends WorkerHost {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly minesService: MinesService,
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    try {
      switch (job.name) {
        case QueueJobs.MINES_SETTLE_BET:
          await this.minesService.autoSettleBet(job.data);
          break;
      }
    } catch (error) {
      this.monitor.error('Error processing mines queue', { error, data: { name: job.name, data: job.data } });
    }
  }
}
