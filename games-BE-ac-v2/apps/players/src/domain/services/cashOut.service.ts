import { Injectable } from '@nestjs/common';
import { RedlockClientConfigService } from '@provfair/configuration/redlock-client/configuration.service';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { RedlockClient } from '@provfair/modules/redlock/redlock.client';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { MonitoringService } from '@provfair/monitoring';
import { CashOutResponseDTO } from '@provfair/shared/dtos';
import { BetStatus, MultiPlayerGameStates, RedisCacheKeyEnum } from '@provfair/shared/enums';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { getRoomNameByGame } from '@provfair/shared/helpers/getRoomName';
import { CashOutInput } from '@provfair/shared/inputs';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';
import { CommonService } from '@provfair/shared/services/common.service';
import { Lock } from 'redlock';

@Injectable()
export class CashOutService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly cacheService: CacheService,
    private readonly userBetService: UserBetService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly responseBuilderService: ResponseBuilderService,
    private readonly redlockClient: RedlockClient,
    private readonly redlockConfigService: RedlockClientConfigService,
  ) {
    super();
  }

  public async cashOut(input: CashOutInput, currentUser: AuthUser): Promise<CashOutResponseDTO> {
    const { playerId, token, gameMode, operatorId } = currentUser;
    input = { ...input, playerId, token, gameMode, operatorId };

    const { betId } = input;
    let { gameCode } = input;

    gameCode = gameCode ?? currentUser.gameCode;

    this.monitor.info('=== CashOut started ===', { data: { input } });

    const lockKey = `be:lock:cashout:${betId}`;
    let locker: Lock;
    try {
      // Acquire the lock.
      locker = await this.redlockClient.lock(lockKey, this.redlockConfigService.redlock.ttl);

      const currentGame: IActiveGameCache = await this.cacheService.getCache(
        getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode, gameMode }),
      );

      if (!currentGame) {
        throw new Error('No active game found');
      } else if (currentGame.status !== MultiPlayerGameStates.RUNNING) {
        throw new Error('Game not in running state');
      }

      const { gameId, roundId, currentMultiplier } = currentGame;

      const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode, roundId });

      const bet = await this.userBetService.findBetCacheOrFallBack(betId, roundKey);

      if (!bet) {
        throw new Error('Bet not found');
      } else if (bet.betStatus !== BetStatus.DEBIT_SUCCESS) {
        throw new Error('Bet already settled');
      } else if (bet.roundId !== roundId) {
        throw new Error('Bet is not for current round.');
      } else if (bet.playerId !== playerId) {
        throw new Error('User mismatch, this bet was not placed by you.');
      }

      const globalRoom = getRoomNameByGame(gameCode, gameMode);

      await this.cacheService.removeFromSet({ key: roundKey, field: betId });

      bet.payout = bet.betAmount * currentMultiplier;
      bet.payoutMultiplier = currentMultiplier;

      this.socketIOEmitterService.emit({
        eventName: globalRoom,
        roomIds: globalRoom,
        data: this.responseBuilderService.cashOutWsResp(bet),
      });

      const rgsData = {
        betId,
        roundId,
        gameCode,
        playerId,
        token,
        payoutMultiplier: bet.payoutMultiplier,
        winAmount: bet.payout,
        clientSeed: bet.clientSeed,
        serverSeed: bet.clientSeed,
        hashedServerSeed: bet.hashedServerSeed,
        nonce: bet.nonce,
      };

      // TODO: RGS call can be offloaded to some event bus like mqtt/kafka/nats
      this.rgsServiceInstance
        .credit([rgsData])
        .then((resp) => {
          this.userBetService
            .updateBet(betId, {
              $set: {
                payout: rgsData.winAmount,
                payoutMultiplier: rgsData.payoutMultiplier,
                betStatus: BetStatus.CREDIT_SUCCESS,
                active: false,
              },
            })
            .catch((e) =>
              this.monitor.error(`cashOut: Error on updating user bet.`, {
                data: { gameCode, betId, roundId },
                error: e,
              }),
            );
        })
        .catch((e) => {
          this.monitor.error('Error on RGS credit call from cashOut', { error: e, data: { gameCode, betId, roundId } });

          this.userBetService
            .updateBet(betId, {
              $set: {
                payout: rgsData.winAmount,
                payoutMultiplier: rgsData.payoutMultiplier,
                betStatus: BetStatus.CREDIT_FAILED,
              },
            })
            .catch((e) =>
              this.monitor.error(`cashOut: Error on updating user bet.`, {
                data: { gameCode, betId, roundId },
                error: e,
              }),
            );
        });

      this.monitor.info('=== CashOut ended ===', { data: { input } });

      return { ...bet, gameId: bet.gameId.toString() };
    } finally {
      this.redlockClient.unlock(locker);
    }
  }

  public async handleAutoCashOut(bet: UserBet): Promise<void> {
    const { betId, roundId, payout, payoutMultiplier, gameCode, playerId, token } = bet;
    this.monitor.info('=== Auto CashOut started ===', { data: { betId, roundId, payout, payoutMultiplier } });

    const lockKey = `be:lock:cashout:${betId}`;
    let locker: Lock;
    try {
      locker = await this.redlockClient.lock(lockKey, this.redlockConfigService.redlock.ttl);

      const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode, roundId });

      await this.cacheService.removeFromSet({ key: roundKey, field: betId });

      const rgsData = {
        betId,
        roundId,
        gameCode,
        playerId,
        token,
        payoutMultiplier: bet.payoutMultiplier,
        winAmount: bet.payout,
        clientSeed: bet.clientSeed,
        serverSeed: bet.clientSeed,
        hashedServerSeed: bet.hashedServerSeed,
        nonce: bet.nonce,
      };

      // TODO: RGS call can be offloaded to some event bus like mqtt/kafka/nats
      this.rgsServiceInstance
        .credit([rgsData])
        .then((resp) => {
          this.userBetService
            .updateBet(betId, {
              $set: {
                payout: rgsData.winAmount,
                payoutMultiplier: rgsData.payoutMultiplier,
                betStatus: BetStatus.CREDIT_SUCCESS,
              },
            })
            .catch((e) =>
              this.monitor.error(`cashOut: Error on updating user bet.`, {
                data: { gameCode, betId, roundId },
                error: e,
              }),
            );
        })
        .catch((e) => {
          // TODO: Handle RGS error here, and if failed this can be retired
          this.monitor.error('Error on RGS credit call from cashOut', { error: e, data: { gameCode, betId, roundId } });

          this.userBetService
            .updateBet(betId, {
              $set: {
                payout: rgsData.winAmount,
                payoutMultiplier: rgsData.payoutMultiplier,
                betStatus: BetStatus.CREDIT_FAILED,
              },
            })
            .catch((e) =>
              this.monitor.error(`cashOut: Error on updating user bet.`, {
                data: { gameCode, betId, roundId },
                error: e,
              }),
            );
        });

      this.monitor.info('=== Auto CashOut ended ===', { data: { betId, roundId, payout, payoutMultiplier } });
    } finally {
      this.redlockClient.unlock(locker);
    }
  }
}
