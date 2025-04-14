import { Processor, WorkerHost } from '@nestjs/bullmq';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { MonitoringService } from '@provfair/monitoring';
import { PLAYERS_QUEUE } from '@provfair/shared/constants/Queue';
import { QueueJobs } from '@provfair/shared/enums';
import { Job } from 'bullmq';
import { CashOutService } from '../services';

@Processor(PLAYERS_QUEUE)
export class PlayersConsumer extends WorkerHost {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly cashOutService: CashOutService,
  ) {
    super();
  }

  async process(job: Job<UserBet, any, string>): Promise<any> {
    try {
      switch (job.name) {
        case QueueJobs.AUTO_CASHOUT:
          const bet = job.data;
          await this.cashOutService.handleAutoCashOut(bet);
          break;
      }
    } catch (error) {
      this.monitor.error('Error processing players queue', { error, data: { name: job.name, data: job.data } });
    }
  }
}
