import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RedlockClientConfigService } from '@provfair/configuration/redlock-client/configuration.service';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { RedlockClient } from '@provfair/modules/redlock/redlock.client';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { BulkUpdateUserBetInput } from '@provfair/modules/user/inputs/bulkUpdateUserBet.input';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { MonitoringService } from '@provfair/monitoring';
import { PLAYERS_BULK_UPDATE_BETS } from '@provfair/shared/constants/MicroServiceEvents';
import { BetStatus } from '@provfair/shared/enums';
import { Lock } from 'redlock';

interface RGSBalanceUpdateResult {
  transaction_id: string;
  balance: number;
  externalPlayerId: string;
  userId: string;
}

const ttl = 1 * 60 * 60;

const keyPrefix = 'be:players:event_processing:';

@Controller()
export class PlayersController {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly cacheService: CacheService,
    private readonly redlockClient: RedlockClient,
    private readonly redlockConfigService: RedlockClientConfigService,
    private readonly userBetService: UserBetService,
  ) {}

  @MessagePattern('rgs_events')
  async handleRGSEvents(@Payload() data: { eventName: string; eventData: any; messageId: string }) {
    this.monitor.debug('RGS Events received.', { data });

    const { messageId, eventName, eventData } = data;

    const lockKey = `${keyPrefix}lock:${messageId}`;
    let locker: Lock;

    try {
      // Acquire the lock.
      locker = await this.redlockClient.lock(lockKey, this.redlockConfigService.redlock.ttl);

      const result = await this.getResult(messageId);

      if (result) {
        this.monitor.debug(`[PLAYERS_EVENT_RECEIVER]: Job: ${messageId} already processed. Will exit`, {
          data: {
            messageId,
            eventName,
          },
        });

        return true;
      }

      await this.saveResult(messageId);

      if (eventName === 'BALANCE_UPDATE_RESULT') {
        const balanceProcessedForPlayer = new Set();

        for (const info of eventData as RGSBalanceUpdateResult[]) {
          // This if ensures that balance update is sent once for all players.
          if (!balanceProcessedForPlayer.has(info.userId)) {
            balanceProcessedForPlayer.add(info.userId);

            this.socketIOEmitterService.emitPlayerBalanceUpdate({ balance: info.balance, playerId: info.userId });
          }
        }
      } else if (eventName === 'BET_SETTLED' && eventData.betTxnId) {
        this.userBetService.updateBet(eventData.betTxnId, { betStatus: BetStatus.CREDIT_SUCCESS, active: false });
      } else if (eventName === 'BET_ROLLED_BACK' && eventData.betTxnId) {
        this.userBetService.updateBet(eventData.betTxnId, {
          betStatus: BetStatus.REFUND,
          active: false,
          payout: 0,
          payoutMultiplier: 0,
        });
      }
    } catch (err) {
      this.monitor.error('Error processing players rgs_events', { error: err, data: data });
    } finally {
      this.redlockClient.unlock(locker);
    }
  }

  private async getResult(messageId: string): Promise<string> {
    const isExist = await this.cacheService.getCache<string>(`${keyPrefix}${messageId}`);

    return isExist;
  }

  private async saveResult(messageId: string): Promise<void> {
    await this.cacheService.setCache({ key: `${keyPrefix}${messageId}`, expire: ttl, data: 'done' });
  }

  @MessagePattern(PLAYERS_BULK_UPDATE_BETS)
  async bulkUpdateBetsEvents(
    @Payload()
    data: {
      eventData: BulkUpdateUserBetInput;
      messageId: string;
    },
  ) {
    this.monitor.debug('bulkUpdateBets Events received.', { data });

    const { messageId, eventData } = data;

    const lockKey = `${keyPrefix}lock:${messageId}`;
    let locker: Lock;

    try {
      // Acquire the lock.
      locker = await this.redlockClient.lock(lockKey, this.redlockConfigService.redlock.ttl);

      const result = await this.getResult(messageId);

      if (result) {
        this.monitor.debug(`[PLAYERS_EVENT_RECEIVER]: Job: ${messageId} already processed. Will exit`, {
          data: {
            messageId,
          },
        });

        return true;
      }

      await this.saveResult(messageId);

      const resp = await this.userBetService.bulkUpdateBet(eventData);

      this.monitor.debug('bulkUpdateBets Events processed.', { data: { resp } });
    } catch (err) {
      this.monitor.error('Error processing players rgs_events', { error: err, data: data });
    } finally {
      this.redlockClient.unlock(locker);
    }
  }
}
