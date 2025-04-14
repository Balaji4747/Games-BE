import { Injectable } from '@nestjs/common';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { BetPlaceResponseDTO } from '@provfair/shared/dtos';
import { BetStatus, GameCodes, MultiplayerGames, MultiPlayerGameStates } from '@provfair/shared/enums';
import { RedisCacheKeyEnum } from '@provfair/shared/enums/redisCacheKeys.enum';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { getRoomNameByGame } from '@provfair/shared/helpers/getRoomName';
import { BetPlaceInput } from '@provfair/shared/inputs';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';
import { CommonService } from '@provfair/shared/services/common.service';

@Injectable()
export class BetPlaceService extends CommonService {
  private readonly betLimits: Partial<Record<GameCodes, number>> = {
    [GameCodes.AVIATORX]: 2,
    [GameCodes.CRASH]: 2,
    [GameCodes.PCRASH]: 2,
    [GameCodes.BUTTONPOP]: 2,
  };

  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly cacheService: CacheService,
    private readonly userBetService: UserBetService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly responseBuilderService: ResponseBuilderService,
    private readonly userServiceInstance: UsersService,
  ) {
    super();
  }

  public async betPlace(input: BetPlaceInput, currentUser: AuthUser) {
    const { playerId, token, gameMode, operatorId } = currentUser;
    input = { ...input, playerId, token, gameMode, operatorId };

    let { gameCode } = input;
    gameCode = gameCode ?? currentUser.gameCode;

    let returnData: BetPlaceResponseDTO = null;

    if (MultiplayerGames.includes(gameCode)) {
      returnData = await this.multiPlayerBetPlace(input);
    } else {
      returnData = await this.singlePlayerBetPlace(input);
    }

    return returnData;
  }

  private async multiPlayerBetPlace(input: BetPlaceInput): Promise<BetPlaceResponseDTO> {
    const { gameCode, gameMode, betAmount, playerId, currency, token, operatorId, btnIndex, cashOutAt } = input;

    this.monitor.info(`===${gameCode}: betPlace started with data ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetails({ playerId, operatorId });
    if (!user) throw new Error('Player details not found');

    const currentGame: IActiveGameCache = await this.cacheService.getCache(
      getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode, gameMode }),
    );
    if (!currentGame) throw new Error('No active game found');
    if (currentGame.status !== MultiPlayerGameStates.ACCEPT_BET) {
      throw new Error('Bet place not allowed, Please try again in next session.');
    }

    const { roundId, gameId } = currentGame;
    const playerBetCountKey = getRedisCacheKeys(RedisCacheKeyEnum.PLAYER_BET_COUNT, { gameCode, roundId, playerId });
    const totalBetCountKey = getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode, roundId });

    // Handle bet count limits and increment
    let betCount = 0;
    const betCountLimit = this.betLimits[gameCode];
    if (betCountLimit) {
      betCount = (await this.cacheService.getCache(playerBetCountKey)) ?? 0;

      if (betCount >= betCountLimit) throw new Error(`Max ${betCountLimit} bets allowed per round`);

      const pipeline = this.cacheService.redis.pipeline();
      pipeline.incr(playerBetCountKey).expire(playerBetCountKey, 60);
      await pipeline.exec();
    }

    const betId = await this.generateUUid();
    let balance = 0;

    try {
      const { balance: rgsBalance } = await this.rgsServiceInstance.debit({
        token,
        playerId,
        amount: betAmount,
        betId,
        gameCode,
        roundId,
      });
      balance = rgsBalance;
    } catch (error) {
      if (betCountLimit) {
        this.cacheService.redis
          .decr(playerBetCountKey)
          .catch((e) => this.monitor.error(`Error decr player bet count key ${playerBetCountKey}`, { error: e }));
      }
      throw error;
    }

    this.socketIOEmitterService.emitPlayerBalanceUpdate({ balance, playerId });

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });

    // Prepare bet details
    const betDetails: UserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      balance,
      clientSeed: user.clientSeed,
      serverSeed: user.serverSeed,
      hashedServerSeed: user.hashedServerSeed,
      nonce: user.nonce,
      gameCode,
      gameMode,
      currency,
      betAmount,
      payout: 0,
      payoutMultiplier: 0,
      gameId,
      active: true,
      betId,
      roundId,
      cashOutAt,
      btnIndex,
      avatar: user.avatar,
      betStatus: BetStatus.DEBIT_SUCCESS,
      targetMultiplier: input.targetMultiplier,
      createdAt: new Date(),
    };

    const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode, roundId });

    const redisPipeline = this.cacheService.redis.pipeline();

    redisPipeline.incr(totalBetCountKey);
    redisPipeline.hset(roundKey, betId, JSON.stringify(betDetails)).expire(roundKey, 900);

    const [totalBetResult] = await redisPipeline.exec();

    const totalBetCount = Number(totalBetResult[1]);

    const globalRoom = getRoomNameByGame(gameCode, gameMode);

    if (totalBetCount <= 50) {
      this.socketIOEmitterService.emit({
        eventName: globalRoom,
        data: this.responseBuilderService.buildBetPlaceWSResp(betDetails),
        roomIds: globalRoom,
      });
    }

    // Save to DB asynchronously, allowing other operations to proceed
    this.userBetService
      .create(betDetails)
      .catch((e) =>
        this.monitor.error(
          `Error creating user bet for ${gameCode} game ${gameId}, roundId: ${roundId}, betId: ${betId}`,
          { error: e },
        ),
      );

    this.monitor.info(`===${gameCode}: betPlace ended with data ===`, {
      data: { input, balance, betId, gameId, roundId },
    });

    return this.responseBuilderService.buildBetPlaceResp(betDetails);
  }

  private async singlePlayerBetPlace(input: BetPlaceInput): Promise<BetPlaceResponseDTO> {
    const { gameCode, gameMode, betAmount, playerId, currency } = input;

    this.monitor.info(`===${gameCode}: betPlace started with data ===`, { data: { input } });

    // TODO: Implement single player bet place logic

    this.monitor.info(`===${gameCode}: betPlace ended with data ===`, { data: { input } });

    return {
      balance: 100,
      betAmount,
      betId: 'test',
      currency,
      gameCode,
      gameId: 'test',
      gameMode,
      payout: 0,
      payoutMultiplier: 0,
      playerId,
      roundId: 'test',
    };
  }
}
