import { Injectable } from '@nestjs/common';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { MonitoringService } from '@provfair/monitoring';
import { CancelBetResponseDTO } from '@provfair/shared/dtos';
import { BetStatus, GameCodes, MultiPlayerGameStates, RedisCacheKeyEnum } from '@provfair/shared/enums';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { getRoomNameByGame } from '@provfair/shared/helpers/getRoomName';
import { CancelBetInput } from '@provfair/shared/inputs/cancelBet.input';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';

@Injectable()
export class CancelBetService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly cacheService: CacheService,
    private readonly userBetService: UserBetService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly responseBuilderService: ResponseBuilderService,
  ) {}

  public async cancelBet(input: CancelBetInput, currentUser: AuthUser): Promise<CancelBetResponseDTO> {
    const { playerId, token, gameMode, operatorId } = currentUser;
    input = { ...input, playerId, token, gameMode, operatorId };

    const { betId } = input;
    let { gameCode } = input;
    gameCode = gameCode ?? currentUser.gameCode;

    this.monitor.info('=== Cancel Bet started ===', { data: { input } });

    if (![GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP].includes(gameCode)) {
      throw new Error('Cancel bet not allowed for this game: ' + gameCode);
    }

    const currentGame: IActiveGameCache = await this.cacheService.getCache(
      getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode, gameMode }),
    );

    if (!currentGame) {
      throw new Error('No active game found');
    } else if (currentGame.status !== MultiPlayerGameStates.ACCEPT_BET) {
      throw new Error('Cancel not allowed now');
    }

    const { roundId } = currentGame;

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
    const playerBetCountKey = getRedisCacheKeys(RedisCacheKeyEnum.PLAYER_BET_COUNT, { gameCode, roundId, playerId });
    const totalBetCountKey = getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode, roundId });

    await Promise.all([
      this.cacheService.removeFromSet({ key: roundKey, field: betId }),
      this.cacheService.redis.decr(playerBetCountKey),
      this.cacheService.redis.decr(totalBetCountKey),
    ]);

    this.socketIOEmitterService.emit({
      eventName: globalRoom,
      roomIds: globalRoom,
      data: this.responseBuilderService.cancelBetWsResp(bet),
    });

    const rgsData = {
      token,
      playerId,
      betId,
      roundId,
      gameCode,
      amount: bet.betAmount,
    };

    // TODO: RGS call can be offloaded to some event bus like mqtt/kafka/nats
    this.rgsServiceInstance
      .refund(rgsData)
      .then((resp) => {
        this.userBetService
          .updateBet(betId, {
            $set: {
              payout: 0,
              payoutMultiplier: 0,
              betStatus: BetStatus.REFUND,
            },
          })
          .catch((e) =>
            this.monitor.error(`cashOut: Error on updating user bet.`, {
              data: { gameCode, betId, roundId },
              error: e,
            }),
          );

        this.socketIOEmitterService.emitPlayerBalanceUpdate({ playerId, balance: resp.balance });
      })
      .catch((e) => {
        // TODO: Handle RGS error here, and if failed this can be retired
        this.monitor.error('Error on RGS credit call from cashOut', { error: e });

        this.userBetService
          .updateBet(betId, {
            $set: {
              payout: 0,
              payoutMultiplier: 0,
              betStatus: BetStatus.REFUND_FAILED,
              err: e,
            },
          })
          .catch((e) =>
            this.monitor.error(`cashOut: Error on updating user bet.`, {
              data: { gameCode, betId, roundId },
              error: e,
            }),
          );
      });

    this.monitor.info('=== Cancel ended ===', { data: { input } });

    return { ...bet, gameId: bet.gameId.toString() };
  }
}
