import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';
import { GameConfig } from '@provfair/apps/management/src/app/schemas/gameConfig.schema';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { SortOffsetLimitArgs } from '@provfair/modules/graphql/inputs/sort-offset-limit.args';
import { LocalCacheService } from '@provfair/modules/local-cache/localCache.service';
import { MultiplayerGameOutcomeService, PreGenerateServerCodeService } from '@provfair/modules/provablyFair/services';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { BulkUpdateBetsInput, BulkUpdateUserBetInput } from '@provfair/modules/user/inputs/bulkUpdateUserBet.input';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { MonitoringService } from '@provfair/monitoring';
import { PLAYERS_SERVICE } from '@provfair/shared/constants/MicroServiceClients';
import { PLAYERS_BULK_UPDATE_BETS } from '@provfair/shared/constants/MicroServiceEvents';
import { GAME_SEEDS } from '@provfair/shared/constants/ProbablyFairOutcomes';
import { PLAYERS_QUEUE } from '@provfair/shared/constants/Queue';
import { BetStatus, QueueJobs, RedisCacheKeyEnum, SocketEvents } from '@provfair/shared/enums';
import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';
import { DEFAULT_GAME_MODE, GameMode } from '@provfair/shared/enums/gameModes.enum';
import { MultiPlayerGameStates } from '@provfair/shared/enums/multiPlayerGameStates.enum';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { getRoomNameByGame } from '@provfair/shared/helpers/getRoomName';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';
import { GameSeeds, GameSeedsModel } from '@provfair/shared/schemas/gameSeeds.schema';
import { CommonService } from '@provfair/shared/services/common.service';
import { Queue } from 'bullmq';
import { CrashCurrentDayRoundResponseDTO } from './dtos/currentDayRounds-response.dto';
import { CrashHashCode, CrashHashCodeModel } from './schema/crashHashCode.schema';
import { CrashRound, CrashRoundModel } from './schema/crashRound.schema';

interface ILocalAutoCashOutBets extends UserBet {
  isLocalAutoCashedOutProcessed?: boolean;
}

@Injectable()
export class CrashService extends CommonService implements OnApplicationBootstrap {
  private runningGameModes: Map<GameMode, { stop: boolean }> = new Map();
  private gameConfig: GameConfig = {
    activeGameModes: [DEFAULT_GAME_MODE],
    gameCode: GameCodes.CRASH,
    maxMultiplierCap: 0,
    acceptBetDelay: 10000,
  };

  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly cacheService: CacheService,
    private readonly localCacheService: LocalCacheService,
    private readonly multiPlayerOutComeService: MultiplayerGameOutcomeService,
    private readonly preGenerateServerCodeService: PreGenerateServerCodeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    @InjectModel(CrashRound.name) private crashRoundModel: CrashRoundModel,
    @InjectModel(CrashHashCode.name) private crashHashCodeModel: CrashHashCodeModel,
    @InjectModel(GameSeeds.name) private gameSeedsModel: GameSeedsModel,
    private readonly responseBuilderService: ResponseBuilderService,
    @Inject(PLAYERS_SERVICE) private playersServiceClient: ClientProxy,
    @InjectQueue(PLAYERS_QUEUE) private queue: Queue,
  ) {
    super();
  }

  onApplicationBootstrap() {
    this.monitor.info('Crash service module init called');
    this.monitorGameModes();
  }

  private async getGameSeed() {
    let seeds = await this.localCacheService.getCache<GameSeeds>(`${GameCodes.CRASH}/gameSeeds`);

    if (!seeds) {
      this.monitor.info('===CRASH: fetching Game seed ===');

      seeds = await this.gameSeedsModel.findOne({ gameCode: GameCodes.CRASH }).select({ seed: 1 });

      if (!seeds) {
        seeds = await this.gameSeedsModel.create(GAME_SEEDS[GameCodes.CRASH]);
      }

      await this.localCacheService.setCache({
        key: `${GameCodes.CRASH}/gameSeeds`,
        data: (seeds as any).toJSON(),
        expire: 86400,
      });
    }

    return seeds;
  }

  @Interval(60000) // Check every 1 min
  private async monitorGameModes() {
    try {
      const availableGameModes = await this.fetchGameModesFromDB();

      this.monitor.info('Game modes fetched.', { data: availableGameModes });

      // Start new loops for newly added game modes
      for (const gameMode of availableGameModes) {
        if (!this.runningGameModes.has(gameMode)) {
          this.runningGameModes.set(gameMode, { stop: false });
          this.runGameLoop(gameMode);
        }
      }

      // Stop loops for game modes that are no longer available
      for (const [gameMode, control] of this.runningGameModes.entries()) {
        if (!availableGameModes.includes(gameMode)) {
          control.stop = true; // Signal to stop the loop
          this.runningGameModes.delete(gameMode);
          this.monitor.info(`Stopping game loop for game mode: ${gameMode}`);
        }
      }
    } catch (error) {
      this.monitor.error('Error while monitoring game modes', { error });
    }
  }

  private async runGameLoop(gameMode: GameMode) {
    const control = this.runningGameModes.get(gameMode);

    const loop = async () => {
      if (!control || control.stop) {
        this.monitor.info(`Game loop stopped for game mode: ${gameMode}`);

        // Here we emit event to FE for this stopped gameMode, so that the users connected to this gameMode knows that this gameMode will not continue anymore and ask to reload the page to connect to new gameMode.

        const globalRoomByGame = getRoomNameByGame(GameCodes.CRASH, gameMode);

        this.socketIOEmitterService.emit({
          eventName: globalRoomByGame,
          data: {
            gameMode,
            gameCode: GameCodes.CRASH,
            status: MultiPlayerGameStates.UNDER_MAINTENANCE,
            reason:
              'This game mode is not available anymore, please refresh the page to get connected to new game mode.',
          },
          roomIds: globalRoomByGame,
        });
        return;
      }

      try {
        await this.createGame(gameMode);
      } catch (error) {
        this.monitor.error(`Error in game loop for mode ${gameMode}`, { error });
      }

      // Schedule the next iteration without blocking the event loop
      setTimeout(loop, 0);
    };

    // Start the loop
    loop();
  }

  private async fetchGameModesFromDB(): Promise<GameMode[]> {
    this.monitor.debug('Fetching game modes from DB');

    const gameConfig: GameConfig = await this.cacheService.getElementFromSet({
      key: getRedisCacheKeys(RedisCacheKeyEnum.GAME_CONFIG, null),
      field: GameCodes.CRASH,
    });

    if (gameConfig) {
      this.gameConfig.activeGameModes = gameConfig.activeGameModes;
      this.gameConfig.maxMultiplierCap = gameConfig.maxMultiplierCap;
      this.gameConfig.acceptBetDelay = gameConfig.acceptBetDelay ?? this.gameConfig.acceptBetDelay;
    }

    return this.gameConfig.activeGameModes;
  }

  private async updateGameCache(gameMode: GameMode, data: IActiveGameCache) {
    await this.cacheService.setCache({
      key: getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode: GameCodes.CRASH, gameMode }),
      data,
      expire: 900,
    });
  }

  private async createGame(gameMode: GameMode): Promise<void> {
    this.monitor.info('===CRASH: createGame started ===', { data: { gameMode } });
    const globalRoomByGame = getRoomNameByGame(GameCodes.CRASH, gameMode);

    const gameSeeds = await this.preGenerateServerCodeService.getSeeds<CrashHashCode>(
      this.crashHashCodeModel,
      GameCodes.CRASH,
    );

    const gameSeedInfo = gameSeeds[0];
    const seedInfo = await this.getGameSeed();

    this.crashHashCodeModel
      .updateOne({ _id: gameSeedInfo._id }, { isUsed: true })
      .catch((e) => this.monitor.error(`Error on crash server codes update for ID: ${gameSeedInfo._id}`, { error: e }));

    this.monitor.info('===CRASH: adding new game===');

    const roundId = await this.generateUUid();
    const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.CRASH, roundId });

    const gameRound = await this.crashRoundModel.create({
      seedId: gameSeedInfo._id,
      status: MultiPlayerGameStates.SCHEDULED,
      round: gameSeedInfo.order,
      roundId,
      gameMode,
      hash: gameSeedInfo.hash,
      seed: seedInfo.seed,
    });

    this.monitor.info('===CRASH: new game added ===', {
      data: { game: { ...gameRound.toJSON(), _id: gameRound._id.toString() } },
    });

    const cacheData: IActiveGameCache = {
      gameId: gameRound.id,
      roundId,
      status: MultiPlayerGameStates.SCHEDULED,
      gameMode,
      hash: gameSeedInfo.hash,
      seed: seedInfo.seed,
    };

    await this.updateGameCache(gameMode, cacheData);

    this.socketIOEmitterService.emit({
      eventName: globalRoomByGame,
      data: cacheData,
      roomIds: globalRoomByGame,
    });

    await this.timer(200);

    cacheData.status = MultiPlayerGameStates.ACCEPT_BET;
    cacheData.acceptBetDelay = this.gameConfig.acceptBetDelay;
    cacheData.acceptBetEndTime = Date.now() + this.gameConfig.acceptBetDelay;
    await this.updateGameCache(gameMode, cacheData);

    this.socketIOEmitterService.emit({
      eventName: globalRoomByGame,
      data: { ...cacheData, status: MultiPlayerGameStates.ACCEPT_BET, delay: this.gameConfig.acceptBetDelay },
      roomIds: globalRoomByGame,
    });

    gameRound.updateOne({ status: MultiPlayerGameStates.ACCEPT_BET }).catch((e) =>
      this.monitor.error(`Error on crash gameRound update to accept bet for ID: ${gameRound.id}`, {
        error: e,
        data: { roundId },
      }),
    );

    this.monitor.info(`===CRASH: game ${gameRound._id}, roundId: ${roundId} updated to bet accepting state ===`);

    await this.timer(this.gameConfig.acceptBetDelay);

    cacheData.status = MultiPlayerGameStates.STARTING;
    cacheData.acceptBetDelay = 0;
    await this.updateGameCache(gameMode, cacheData);

    const totalBets = await this.cacheService.getCache<number>(
      getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode: GameCodes.CRASH, roundId }),
    );

    this.socketIOEmitterService.emit({
      eventName: globalRoomByGame,
      data: { ...cacheData, status: MultiPlayerGameStates.STARTING, totalBets, delay: 2000 },
      roomIds: globalRoomByGame,
    });

    await this.timer(2000);

    const allBetsMap = await this.cacheService.getSet<UserBet>({ key: roundKey });

    const autoCashOutBets: ILocalAutoCashOutBets[] = [];

    for (const [, bet] of allBetsMap) {
      if (bet.cashOutAt > 0) {
        autoCashOutBets.push({ ...bet, isLocalAutoCashedOutProcessed: false });
      }
    }

    const autoCashOutLocalKey = `${GameCodes.CRASH}/${roundId}/autoCashOutLocal`;
    await this.localCacheService.setCache({ key: autoCashOutLocalKey, data: autoCashOutBets, expire: 900 });

    const multiplier = await this.multiPlayerOutComeService.generateGameOutcomes(
      gameSeedInfo.hash,
      seedInfo.seed,
      GameCodes.CRASH,
      gameMode,
      this.gameConfig.maxMultiplierCap,
    );

    gameRound
      .updateOne({
        status: MultiPlayerGameStates.RUNNING,
        crashMultiplier: multiplier,
      })
      .catch((e) =>
        this.monitor.error(`Error updating DB for crash game ${gameRound.id}, roundId: ${roundId} to running status`, {
          error: e,
        }),
      );

    cacheData.finalCrashMultiplier = multiplier;
    cacheData.status = MultiPlayerGameStates.RUNNING;
    await this.updateGameCache(gameMode, cacheData);

    await this.runGame(gameMode, cacheData, globalRoomByGame);
    this.handleGameCrash(cacheData);

    await this.timer(2000);

    //Clear cache for game completed

    this.cacheService.batchDeleteKeys([
      getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode: GameCodes.CRASH, gameMode }),
      getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode: GameCodes.CRASH, roundId }),
      roundKey,
    ]);

    this.monitor.info('===CRASH: createGame ended ===', { data: { gameMode } });
  }

  private async runGame(gameMode: GameMode, cacheData: IActiveGameCache, globalRoomByGame: string) {
    const { gameId, roundId, finalCrashMultiplier } = cacheData;

    this.monitor.info(
      `===CRASH: game: ${gameId}, roundId: ${roundId}, will be executed till crash at ${finalCrashMultiplier}===`,
    );

    const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.CRASH, roundId });

    let multiplier = 1; // Start with a multiplier of 1.00
    const growthFactor = 1.01; // Growth factor equivalent to the 1.01 multiplier in loop

    while (multiplier <= finalCrashMultiplier) {
      await this.timer(100);

      this.socketIOEmitterService.emit({
        eventName: globalRoomByGame,
        data: { gameId, roundId, status: MultiPlayerGameStates.RUNNING, multiplier, isCrashed: false },
        roomIds: globalRoomByGame,
      });

      if (multiplier > 1) {
        cacheData.currentMultiplier = multiplier;
        await this.updateGameCache(gameMode, cacheData);

        // Handle auto cashout
        this.settleAutoCashOuts({ roundId, multiplier, gameMode, roundKey });
      }

      // Increment multiplier by growth factor
      multiplier *= growthFactor;

      if (multiplier > finalCrashMultiplier) {
        multiplier = finalCrashMultiplier;

        // As this will be settled after crashing then don't emit socket just settle the bet.
        this.settleAutoCashOuts({ roundId, multiplier, roundKey, gameMode, emitEvent: false });

        this.monitor.info(`===CRASH: game: ${gameId}, roundId: ${roundId} has been crashed===`);

        cacheData.status = MultiPlayerGameStates.ENDED;
        cacheData.currentMultiplier = multiplier;

        await this.updateGameCache(gameMode, cacheData);

        this.socketIOEmitterService.emit({
          eventName: `${globalRoomByGame}`,
          data: { gameId, roundId, status: MultiPlayerGameStates.ENDED, multiplier, isCrashed: true, delay: 5000 },
          roomIds: globalRoomByGame,
        });

        break;
      }
    }
  }

  private async handleGameCrash(cacheData: IActiveGameCache) {
    const { gameId, roundId, gameMode, finalCrashMultiplier } = cacheData;
    try {
      this.monitor.info(`===CRASH: _handleGameCrash started for game ${gameId}, roundId ${roundId}===`);

      const autoCashOutLocalKey = `${GameCodes.CRASH}/${roundId}/autoCashOutLocal`;
      const autoCashOutBets = await this.localCacheService.getCache<ILocalAutoCashOutBets[]>(autoCashOutLocalKey);
      const objAutoCashOuts: Record<string, ILocalAutoCashOutBets> = autoCashOutBets.reduce((acc, resp) => {
        acc[resp.betId] = resp;
        return acc;
      }, {});

      const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.CRASH, roundId });
      const globalRoomByGame = getRoomNameByGame(GameCodes.CRASH, gameMode);

      const bets = await this.cacheService.getSet<UserBet>({ key: roundKey });
      let betsArr = Array.from(bets.values());

      // Filter out the auto cash out bets
      betsArr = betsArr.filter((bet, index) => {
        // The chance of coming in this if check is low, as mostly all the auto cashouts are settled in another method, but any chance if it is missed then it will be settled here. For settlement from here no cashout event will go, as game has already ended.
        if (objAutoCashOuts[bet.betId]) {
          if (objAutoCashOuts[bet.betId].isLocalAutoCashedOutProcessed) {
            return false;
          } else {
            if (bet.cashOutAt < finalCrashMultiplier) {
              betsArr[index].payout = bet.betAmount * bet.cashOutAt;
              betsArr[index].payoutMultiplier = bet.cashOutAt;
            }
          }
        }

        (betsArr[index] as any).winAmount = bet.payout || 0;

        return true;
      });

      const rgsResp = await this.rgsServiceInstance.credit(betsArr as any);

      const objCreditResp = rgsResp.reduce((acc, resp) => {
        acc[resp.transaction_id] = resp;
        return acc;
      }, {});

      const bulkOps: BulkUpdateBetsInput[] = [];

      for (const bet of betsArr) {
        const creditResp = objCreditResp[bet.betId];

        bulkOps.push({
          active: false,
          payout: bet.payout,
          payoutMultiplier: bet.payoutMultiplier,
          betStatus: creditResp ? BetStatus.CREDIT_SUCCESS : BetStatus.CREDIT_FAILED,
          betId: bet.betId,
          crashMultiplier: finalCrashMultiplier,
          roundId,
          seed: cacheData.seed,
          hash: cacheData.hash,
        });
      }

      this.playersServiceClient.emit(PLAYERS_BULK_UPDATE_BETS, {
        eventData: {
          bets: bulkOps,
          roundId,
          finalCrashMultiplier,
          seed: cacheData.seed,
          hash: cacheData.hash,
        } as BulkUpdateUserBetInput,
        messageId: await this.generateUUid(),
      });

      this.crashRoundModel
        .updateOne({ _id: cacheData.gameId }, { status: MultiPlayerGameStates.ENDED })
        .catch((error) =>
          this.monitor.error('Crash: _handleGameCrash: Error on game round update DB.', {
            error,
            data: { gameId, roundId },
          }),
        );

      this.cacheService.delCache(roundKey);

      this.monitor.info(`===CRASH: _handleGameCrash ended for game ${gameId}, roundId ${roundId}===`);
    } catch (error) {
      this.monitor.error('Error on crash handleGameCrash', { error, data: { gameId, roundId } });
    }
  }

  private async settleAutoCashOuts(data: {
    multiplier: number;
    roundKey: string;
    roundId: string;
    gameMode: GameMode;
    emitEvent?: boolean;
  }) {
    const { multiplier, roundId, roundKey, gameMode, emitEvent = true } = data;

    const autoCashOutLocalKey = `${GameCodes.CRASH}/${roundId}/autoCashOutLocal`;

    let autoCashOutBets = await this.localCacheService.getCache<ILocalAutoCashOutBets[]>(autoCashOutLocalKey);

    autoCashOutBets = autoCashOutBets ?? [];

    const globalRoomByGame = getRoomNameByGame(GameCodes.CRASH, gameMode);

    for (let index = 0; index < autoCashOutBets.length; index++) {
      const bet = autoCashOutBets[index];

      if (bet.isLocalAutoCashedOutProcessed) {
        continue;
      }

      if (multiplier <= bet.cashOutAt) {
        continue;
      }

      const betFromCache: UserBet = await this.cacheService.getElementFromSet({ key: roundKey, field: bet.betId });

      // If bet doesnt exists in cache, this means user have manually cashed out
      if (!betFromCache) {
        continue;
      }

      if (bet.cashOutAt < multiplier) {
        bet.isLocalAutoCashedOutProcessed = true;
        bet.payout = bet.betAmount * bet.cashOutAt;
        bet.payoutMultiplier = bet.cashOutAt;

        const wsResp = this.responseBuilderService.cashOutWsResp(bet);

        if (emitEvent) {
          this.socketIOEmitterService.emit({
            eventName: globalRoomByGame,
            roomIds: globalRoomByGame,
            data: wsResp,
          });

          this.socketIOEmitterService.emit({
            eventName: SocketEvents.CASHOUT_RESPONSE,
            roomIds: bet.playerId,
            data: wsResp,
          });
        }

        this.queue.add(QueueJobs.AUTO_CASHOUT, bet);
      }
    }

    await this.localCacheService.setCache({ key: autoCashOutLocalKey, data: autoCashOutBets, expire: 900 });
  }

  public async getRoundInfo(roundId: string): Promise<any> {
    const roundInfo = await this.crashRoundModel.findOne({ roundId, status: MultiPlayerGameStates.ENDED });

    if (!roundInfo) {
      return null;
    }

    return {
      ...roundInfo.toJSON(),
      hex: roundInfo.hash.slice(0, 13),
      decimal: parseInt(roundInfo.hash.slice(0, 13), 16),
    };
  }

  public async getCurrentDayRounds(
    query: SortOffsetLimitArgs,
    currentUser: AuthUser,
  ): Promise<CrashCurrentDayRoundResponseDTO[]> {
    query.skip = query.limit * (query.pageNo - 1);

    const { startOfDay, endOfDay } = this.getStartEndDay();

    const records = await this.crashRoundModel
      .find({
        gameMode: currentUser.gameMode,
        status: MultiPlayerGameStates.ENDED,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .skip(query.skip)
      .limit(query.limit)
      .sort({ [query.sortKey]: query.sortDir })
      .lean();

    const mappedRec: CrashCurrentDayRoundResponseDTO[] = records.map((round) => ({
      gameId: round._id.toString(),
      roundId: round.roundId,
      round: round.round,
      crashMultiplier: round.crashMultiplier,
      createdAt: round.createdAt,
      status: round.status,
    }));

    return mappedRec;
  }
}
