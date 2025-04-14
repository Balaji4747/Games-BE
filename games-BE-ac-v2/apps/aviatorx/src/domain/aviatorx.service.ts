import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';
import { GameConfig } from '@provfair/apps/management/src/app/schemas/gameConfig.schema';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { LocalCacheService } from '@provfair/modules/local-cache/localCache.service';
import { AviatorxOutcomeService, PreGenerateServerCodeService } from '@provfair/modules/provablyFair/services';
import { ResponseBuilderService } from '@provfair/modules/responseBuilder/responseBuilder.service';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { BulkUpdateBetsInput, BulkUpdateUserBetInput } from '@provfair/modules/user/inputs/bulkUpdateUserBet.input';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { MonitoringService } from '@provfair/monitoring';
import { PLAYERS_SERVICE } from '@provfair/shared/constants/MicroServiceClients';
import { PLAYERS_BULK_UPDATE_BETS } from '@provfair/shared/constants/MicroServiceEvents';
import { PLAYERS_QUEUE } from '@provfair/shared/constants/Queue';
import { BetStatus, QueueJobs, RedisCacheKeyEnum, SocketEvents } from '@provfair/shared/enums';
import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';
import { DEFAULT_GAME_MODE, GameMode } from '@provfair/shared/enums/gameModes.enum';
import { MultiPlayerGameStates } from '@provfair/shared/enums/multiPlayerGameStates.enum';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { getRoomNameByGame } from '@provfair/shared/helpers/getRoomName';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';
import { CommonService } from '@provfair/shared/services/common.service';
import { Queue } from 'bullmq';
import { AviatorxLastRoundDTO } from './dtos/lastRound-response.dto';
import { AviatorxRound, AviatorxRoundModel } from './schema/aviatorxRounds.schema';
import { AviatorxServerCodes, AviatorxServerCodesModel } from './schema/aviatorxServerCode.schema';

interface ILocalAutoCashOutBets extends UserBet {
  isLocalAutoCashedOutProcessed?: boolean;
}

@Injectable()
export class AviatorxService extends CommonService implements OnApplicationBootstrap {
  private runningGameModes: Map<GameMode, { stop: boolean }> = new Map();
  private readonly maxLastRounds = 30;
  private lastRoundCounter = 0;
  private gameConfig: GameConfig = {
    activeGameModes: [DEFAULT_GAME_MODE],
    gameCode: GameCodes.AVIATORX,
    maxMultiplierCap: 0,
    acceptBetDelay: 20000,
  };

  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly cacheService: CacheService,
    private readonly localCacheService: LocalCacheService,
    private readonly aviatorxOutcomeService: AviatorxOutcomeService,
    private readonly preGenerateServerCodeService: PreGenerateServerCodeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    @InjectModel(AviatorxRound.name) private aviatorxRoundModel: AviatorxRoundModel,
    @InjectModel(AviatorxServerCodes.name) private aviatorxServerCodesModel: AviatorxServerCodesModel,
    private readonly responseBuilderService: ResponseBuilderService,
    @InjectQueue(PLAYERS_QUEUE) private queue: Queue,
    @Inject(PLAYERS_SERVICE) private playersServiceClient: ClientProxy,
  ) {
    super();
  }

  onApplicationBootstrap() {
    this.monitor.info('Aviatorx service module init called');
    this.monitorGameModes();
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

        const globalRoom = getRoomNameByGame(GameCodes.AVIATORX, gameMode);

        this.socketIOEmitterService.emit({
          eventName: globalRoom,
          data: {
            gameMode,
            gameCode: GameCodes.AVIATORX,
            status: MultiPlayerGameStates.UNDER_MAINTENANCE,
            reason:
              'This game mode is not available anymore, please refresh the page to get connected to new game mode.',
          },
          roomIds: globalRoom,
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
      field: GameCodes.AVIATORX,
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
      key: getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode: GameCodes.AVIATORX, gameMode }),
      data,
      expire: 900,
    });
  }

  private async createGame(gameMode: GameMode): Promise<void> {
    this.monitor.info('===AVIATORX: createGame started ===', { data: { gameMode } });
    const globalRoom = getRoomNameByGame(GameCodes.AVIATORX, gameMode);

    const gameSeeds = await this.preGenerateServerCodeService.getSeeds<AviatorxServerCodes>(
      this.aviatorxServerCodesModel,
      GameCodes.AVIATORX,
      2,
    );

    const gameSeedInfo = gameSeeds[0];

    this.aviatorxServerCodesModel
      .updateOne({ _id: gameSeedInfo._id }, { isUsed: true })
      .catch((e) =>
        this.monitor.error(`Error on aviatorx server codes update for ID: ${gameSeedInfo._id}`, { error: e }),
      );

    this.monitor.info('===AVIATORX: adding new game===');

    const roundId = await this.generateUUid();
    const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.AVIATORX, roundId });

    const gameRound = await this.aviatorxRoundModel.create({
      seedId: gameSeedInfo._id,
      status: MultiPlayerGameStates.SCHEDULED,
      round: gameSeedInfo.order,
      roundId,
      gameMode,
      serverSeed: gameSeedInfo.serverSeed,
      hashedServerSeed: gameSeedInfo.hashedServerSeed,
    });

    this.monitor.info('===AVIATORX: new game added ===', {
      data: { game: { ...gameRound.toJSON(), _id: gameRound._id.toString() } },
    });

    const cacheData: IActiveGameCache = {
      gameId: gameRound.id,
      roundId,
      status: MultiPlayerGameStates.SCHEDULED,
      nextGameHashedSeed: gameSeeds[1].hashedServerSeed,
      gameMode,
    };

    await this.updateGameCache(gameMode, cacheData);

    this.socketIOEmitterService.emit({
      eventName: globalRoom,
      data: cacheData,
      roomIds: globalRoom,
    });

    await this.timer(200);

    cacheData.status = MultiPlayerGameStates.ACCEPT_BET;
    cacheData.acceptBetDelay = this.gameConfig.acceptBetDelay;
    cacheData.acceptBetEndTime = Date.now() + this.gameConfig.acceptBetDelay;
    await this.updateGameCache(gameMode, cacheData);

    this.socketIOEmitterService.emit({
      eventName: globalRoom,
      data: { ...cacheData, status: MultiPlayerGameStates.ACCEPT_BET, delay: this.gameConfig.acceptBetDelay },
      roomIds: globalRoom,
    });

    gameRound.updateOne({ status: MultiPlayerGameStates.ACCEPT_BET }).catch((e) =>
      this.monitor.error(`Error on aviatorx gameRound update to accept bet for ID: ${gameRound.id}`, {
        error: e,
        data: { roundId },
      }),
    );

    this.monitor.info(`===AVIATORX: game ${gameRound._id}, roundId: ${roundId} updated to bet accepting state ===`);

    await this.timer(this.gameConfig.acceptBetDelay);

    cacheData.status = MultiPlayerGameStates.STARTING;
    cacheData.acceptBetDelay = 0;
    await this.updateGameCache(gameMode, cacheData);

    const totalBets = await this.cacheService.getCache<number>(
      getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode: GameCodes.AVIATORX, roundId }),
    );

    this.socketIOEmitterService.emit({
      eventName: globalRoom,
      data: { ...cacheData, status: MultiPlayerGameStates.STARTING, totalBets, delay: 2000 },
      roomIds: globalRoom,
    });

    await this.timer(2000);

    const allBetsMap = await this.cacheService.getSet<UserBet>({ key: roundKey });

    const firstThreeBetters = [];
    const playerClientCodes: string[] = [];
    const autoCashOutBets: ILocalAutoCashOutBets[] = [];

    let counter = 0;
    for (const [, bet] of allBetsMap) {
      if (counter < 3) {
        firstThreeBetters.push({
          betId: bet.betId,
          clientSeed: bet.clientSeed,
          playerId: bet.playerId,
          avatar: bet.avatar,
        });

        playerClientCodes.push(bet.clientSeed);
      }

      if (bet.cashOutAt > 0) {
        autoCashOutBets.push({ ...bet, isLocalAutoCashedOutProcessed: false });
      }

      counter++;
    }

    const autoCashOutLocalKey = `${GameCodes.AVIATORX}/${roundId}/autoCashOutLocal`;
    await this.localCacheService.setCache({ key: autoCashOutLocalKey, data: autoCashOutBets, expire: 900 });

    const { multiplier, hash } = await this.aviatorxOutcomeService.generateGameOutcome(
      gameSeedInfo.serverSeed,
      playerClientCodes.join(','),
      gameMode,
      this.gameConfig.maxMultiplierCap,
    );

    gameRound
      .updateOne({
        status: MultiPlayerGameStates.RUNNING,
        crashMultiplier: multiplier,
        hash: hash,
        firstThreeBetters,
      })
      .catch((e) =>
        this.monitor.error(
          `Error updating DB for aviatorx game ${gameRound.id}, roundId: ${roundId} to running status`,
          { error: e },
        ),
      );

    cacheData.finalCrashMultiplier = multiplier;
    cacheData.status = MultiPlayerGameStates.RUNNING;
    await this.updateGameCache(gameMode, cacheData);

    await this.runGame(gameMode, cacheData, globalRoom);
    this.handleGameCrash(cacheData);

    await this.timer(2000);

    //Clear cache for game completed

    this.cacheService.batchDeleteKeys([
      getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode: GameCodes.AVIATORX, gameMode }),
      getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode: GameCodes.AVIATORX, roundId }),
      roundKey,
    ]);

    this.cacheLastRound({ ...gameRound.toJSON(), crashMultiplier: multiplier });

    this.monitor.info('===AVIATORX: createGame ended ===', { data: { gameMode } });
  }

  private async runGame(gameMode: GameMode, cacheData: IActiveGameCache, globalRoom: string) {
    const { gameId, roundId, finalCrashMultiplier } = cacheData;

    this.monitor.info(
      `===AVIATORX: game: ${gameId}, roundId: ${roundId}, will be executed till crash at ${finalCrashMultiplier}===`,
    );

    const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.AVIATORX, roundId });

    let multiplier = 1; // Start with a multiplier of 1.00
    const growthFactor = 1.01; // Growth factor equivalent to the 1.01 multiplier in loop

    while (multiplier <= finalCrashMultiplier) {
      await this.timer(100);

      this.socketIOEmitterService.emit({
        eventName: `${globalRoom}`,
        data: { gameId, roundId, status: MultiPlayerGameStates.RUNNING, multiplier, isCrashed: false },
        roomIds: globalRoom,
      });

      if (multiplier > 1) {
        cacheData.currentMultiplier = multiplier;
        await this.updateGameCache(gameMode, cacheData);

        // Handle auto cashout
        this.settleAutoCashOuts({ roundId, multiplier, globalRoom, roundKey });
      }

      // Increment multiplier by growth factor
      multiplier *= growthFactor;

      if (multiplier > finalCrashMultiplier) {
        multiplier = finalCrashMultiplier;

        // As this will be settled after crashing then don't emit socket just settle the bet.
        this.settleAutoCashOuts({ roundId, multiplier, globalRoom, roundKey, emitEvent: false });

        this.monitor.info(`===AVIATORX: game: ${gameId}, roundId: ${roundId} has been crashed===`);

        cacheData.status = MultiPlayerGameStates.ENDED;
        cacheData.currentMultiplier = multiplier;

        await this.updateGameCache(gameMode, cacheData);

        this.socketIOEmitterService.emit({
          eventName: `${globalRoom}`,
          data: { gameId, roundId, status: MultiPlayerGameStates.ENDED, multiplier, isCrashed: true, delay: 5000 },
          roomIds: globalRoom,
        });

        break;
      }
    }
  }

  private async handleGameCrash(cacheData: IActiveGameCache) {
    const { gameId, roundId, finalCrashMultiplier } = cacheData;
    try {
      this.monitor.info(`===AVIATORX: _handleGameCrash started for game ${gameId}, roundId ${roundId}===`);

      const autoCashOutLocalKey = `${GameCodes.AVIATORX}/${roundId}/autoCashOutLocal`;
      const autoCashOutBets = await this.localCacheService.getCache<ILocalAutoCashOutBets[]>(autoCashOutLocalKey);
      const objAutoCashOuts: Record<string, ILocalAutoCashOutBets> = autoCashOutBets.reduce((acc, resp) => {
        acc[resp.betId] = resp;
        return acc;
      }, {});

      const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.AVIATORX, roundId });

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
        });
      }

      this.playersServiceClient.emit(PLAYERS_BULK_UPDATE_BETS, {
        eventData: { bets: bulkOps, roundId, finalCrashMultiplier } as BulkUpdateUserBetInput,
        messageId: await this.generateUUid(),
      });

      this.aviatorxRoundModel
        .updateOne({ _id: cacheData.gameId }, { status: MultiPlayerGameStates.ENDED })
        .catch((error) =>
          this.monitor.error('Aviatorx: _handleGameCrash: Error on game round update DB.', {
            error,
            data: { gameId, roundId },
          }),
        );

      this.cacheService.delCache(roundKey);

      this.monitor.info(`===AVIATORX: _handleGameCrash ended for game ${gameId}, roundId ${roundId}===`);
    } catch (error) {
      this.monitor.error('Error on aviatorx handleGameCrash', { error, data: { gameId, roundId } });
    }
  }

  // This is used for fetching last multipliers on game load
  private async cacheLastRound(round: AviatorxRound) {
    try {
      const { gameMode, crashMultiplier, roundId } = round;
      const key = getRedisCacheKeys(RedisCacheKeyEnum.LAST_ROUND_LIST, { gameCode: GameCodes.AVIATORX, gameMode });
      const lastRoundDetails: AviatorxLastRoundDTO = { crashMultiplier, roundId };

      const len = await this.cacheService.pushToList({
        key,
        pushType: 'lpush',
        elements: [JSON.stringify(lastRoundDetails)],
        expire: 0,
      });

      this.lastRoundCounter++;

      // No need to call LTRIM after every LPUSH as that would add to overall latency, so call LTRIM intermittently based on counter
      if (this.lastRoundCounter >= this.maxLastRounds * 2) {
        await this.cacheService.redis.ltrim(key, 0, this.maxLastRounds - 1);

        this.lastRoundCounter = 0; // Reset the counter after trimming
      }
    } catch (error) {
      this.monitor.error('Error caching last round.', { error, data: { roundId: round.roundId } });
    }
  }

  public async getLastMultipliers(gameMode: GameMode): Promise<AviatorxLastRoundDTO[]> {
    const key = getRedisCacheKeys(RedisCacheKeyEnum.LAST_ROUND_LIST, { gameCode: GameCodes.AVIATORX, gameMode });

    const data = await this.cacheService.getList({ key, start: 0, stop: this.maxLastRounds - 1 });

    let lastRounds: AviatorxLastRoundDTO[] = [];

    if (data) {
      lastRounds = data.map((d) => JSON.parse(d));
    }

    return lastRounds;
  }

  private async settleAutoCashOuts(data: {
    multiplier: number;
    globalRoom: string;
    roundKey: string;
    roundId: string;
    emitEvent?: boolean;
  }) {
    const { multiplier, roundId, globalRoom, roundKey, emitEvent = true } = data;

    const autoCashOutLocalKey = `${GameCodes.AVIATORX}/${roundId}/autoCashOutLocal`;

    let autoCashOutBets = await this.localCacheService.getCache<ILocalAutoCashOutBets[]>(autoCashOutLocalKey);

    autoCashOutBets = autoCashOutBets ?? [];

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
            eventName: globalRoom,
            roomIds: globalRoom,
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
    const roundInfo = await this.aviatorxRoundModel.findOne({ roundId, status: MultiPlayerGameStates.ENDED });

    if (!roundInfo) {
      return null;
    }

    return {
      ...roundInfo.toJSON(),
      hex: roundInfo.hash.slice(0, 13),
      decimal: parseInt(roundInfo.hash.slice(0, 13), 16),
    };
  }
}
