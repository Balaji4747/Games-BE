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
import { CreditInterface } from '@provfair/modules/rgs/rgs';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { BulkUpdateBetsInput, BulkUpdateUserBetInput } from '@provfair/modules/user/inputs/bulkUpdateUserBet.input';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { MonitoringService } from '@provfair/monitoring';
import { PLAYERS_SERVICE } from '@provfair/shared/constants/MicroServiceClients';
import { PLAYERS_BULK_UPDATE_BETS } from '@provfair/shared/constants/MicroServiceEvents';
import { GAME_SEEDS } from '@provfair/shared/constants/ProbablyFairOutcomes';
import { PLAYERS_QUEUE } from '@provfair/shared/constants/Queue';
import { BetStatus, RedisCacheKeyEnum, SocketEvents } from '@provfair/shared/enums';
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
import { SlideCurrentDayRoundResponseDTO } from './dtos/currentDayRounds-response.dto';
import { SlideHashCode, SlideHashCodeModel } from './schema/slideHashCode.schema';
import { SlideRound, SlideRoundModel } from './schema/slideRound.schema';

interface ILocalAutoCashOutBets extends UserBet {
  isLocalAutoCashedOutProcessed?: boolean;
}

type PlayerWiseBets = Pick<
  UserBet,
  'playerId' | 'betId' | 'roundId' | 'betAmount' | 'createdAt' | 'targetMultiplier' | 'payout'
>;

@Injectable()
export class SlideService extends CommonService implements OnApplicationBootstrap {
  private runningGameModes: Map<GameMode, { stop: boolean }> = new Map();
  private gameConfig: GameConfig = {
    activeGameModes: [DEFAULT_GAME_MODE],
    gameCode: GameCodes.SLIDE,
    maxMultiplierCap: 0,
  };

  constructor(
    private readonly monitor: MonitoringService,
    private readonly rgsServiceInstance: RgsService,
    private readonly cacheService: CacheService,
    private readonly localCacheService: LocalCacheService,
    private readonly multiPlayerOutComeService: MultiplayerGameOutcomeService,
    private readonly preGenerateServerCodeService: PreGenerateServerCodeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    @InjectModel(SlideRound.name) private slideRoundModel: SlideRoundModel,
    @InjectModel(SlideHashCode.name) private slideHashCodeModel: SlideHashCodeModel,
    @InjectModel(GameSeeds.name) private gameSeedsModel: GameSeedsModel,
    private readonly responseBuilderService: ResponseBuilderService,
    @Inject(PLAYERS_SERVICE) private playersServiceClient: ClientProxy,
    @InjectQueue(PLAYERS_QUEUE) private queue: Queue,
  ) {
    super();
  }

  onApplicationBootstrap() {
    this.monitor.info('Slide service module init called');
    this.monitorGameModes();
  }

  private async getGameSeed() {
    let seeds = await this.localCacheService.getCache<GameSeeds>(`${GameCodes.SLIDE}/gameSeeds`);

    if (!seeds) {
      this.monitor.info('===SLIDE: fetching Game seed ===');

      seeds = await this.gameSeedsModel.findOne({ gameCode: GameCodes.SLIDE }).select({ seed: 1 });

      if (!seeds) {
        seeds = await this.gameSeedsModel.create(GAME_SEEDS[GameCodes.SLIDE]);
      }

      await this.localCacheService.setCache({
        key: `${GameCodes.SLIDE}/gameSeeds`,
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

        const globalRoomByGame = getRoomNameByGame(GameCodes.SLIDE, gameMode);

        this.socketIOEmitterService.emit({
          eventName: globalRoomByGame,
          data: {
            gameMode,
            gameCode: GameCodes.SLIDE,
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
      field: GameCodes.SLIDE,
    });

    if (gameConfig) {
      this.gameConfig.activeGameModes = gameConfig.activeGameModes;
      this.gameConfig.maxMultiplierCap = gameConfig.maxMultiplierCap;
    }

    return this.gameConfig.activeGameModes;
  }

  private async updateGameCache(gameMode: GameMode, data: IActiveGameCache) {
    await this.cacheService.setCache({
      key: getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode: GameCodes.SLIDE, gameMode }),
      data,
      expire: 900,
    });
  }

  private async createGame(gameMode: GameMode): Promise<void> {
    this.monitor.info('===SLIDE: createGame started ===', { data: { gameMode } });
    const globalRoomByGame = getRoomNameByGame(GameCodes.SLIDE, gameMode);

    const gameSeeds = await this.preGenerateServerCodeService.getSeeds<SlideHashCode>(
      this.slideHashCodeModel,
      GameCodes.SLIDE,
    );

    const gameSeedInfo = gameSeeds[0];
    const seedInfo = await this.getGameSeed();

    this.slideHashCodeModel
      .updateOne({ _id: gameSeedInfo._id }, { isUsed: true })
      .catch((e) => this.monitor.error(`Error on slide server codes update for ID: ${gameSeedInfo._id}`, { error: e }));

    this.monitor.info('===SLIDE: adding new game===');

    const roundId = await this.generateUUid();
    const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.SLIDE, roundId });

    const numbers = await this.multiPlayerOutComeService.slideDummyOutcomes(90, gameMode);

    const gameRound = await this.slideRoundModel.create({
      seedId: gameSeedInfo._id,
      status: MultiPlayerGameStates.SCHEDULED,
      round: gameSeedInfo.order,
      roundId,
      gameMode,
      hash: gameSeedInfo.hash,
      seed: seedInfo.seed,
      numbers,
    });

    this.monitor.info('===SLIDE: new game added ===', {
      data: { game: { ...gameRound.toJSON(), _id: gameRound._id.toString(), numbers: '(removed)' } },
    });

    const cacheData: IActiveGameCache = {
      gameId: gameRound.id,
      roundId,
      status: MultiPlayerGameStates.SCHEDULED,
      gameMode,
      numbers,
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

    const startTime = new Date();

    cacheData.status = MultiPlayerGameStates.ACCEPT_BET;
    cacheData.startTime = startTime;
    cacheData.gameEndIn = 18000;
    await this.updateGameCache(gameMode, cacheData);

    this.socketIOEmitterService.emit({
      eventName: globalRoomByGame,
      data: { ...cacheData, status: MultiPlayerGameStates.ACCEPT_BET, delay: 18000, numbers: [] },
      roomIds: globalRoomByGame,
    });

    gameRound.updateOne({ status: MultiPlayerGameStates.ACCEPT_BET }).catch((e) =>
      this.monitor.error(`Error on slide gameRound update to accept bet for ID: ${gameRound.id}`, {
        error: e,
        data: { roundId },
      }),
    );

    this.monitor.info(`===SLIDE: game ${gameRound._id}, roundId: ${roundId} updated to bet accepting state ===`);

    await this.timer(18000);

    cacheData.status = MultiPlayerGameStates.STARTING;
    await this.updateGameCache(gameMode, cacheData);

    const totalBets = await this.cacheService.getCache<number>(
      getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode: GameCodes.SLIDE, roundId }),
    );

    this.socketIOEmitterService.emit({
      eventName: globalRoomByGame,
      data: { ...cacheData, status: MultiPlayerGameStates.STARTING, totalBets, delay: 2000, numbers: [] },
      roomIds: globalRoomByGame,
    });

    await this.timer(2000);

    const multiplier = await this.multiPlayerOutComeService.generateGameOutcomes(
      gameSeedInfo.hash,
      seedInfo.seed,
      GameCodes.SLIDE,
      gameMode,
      this.gameConfig.maxMultiplierCap,
    );

    cacheData.finalCrashMultiplier = multiplier;
    cacheData.currentMultiplier = multiplier; // Will be needed in active game, if for some reason game disconnects then this variable can be used to show the result.
    cacheData.status = MultiPlayerGameStates.RESULT;
    await this.updateGameCache(gameMode, cacheData);

    this.socketIOEmitterService.emit({
      eventName: globalRoomByGame,
      data: {
        gameId: cacheData.gameId,
        roundId,
        status: MultiPlayerGameStates.RESULT,
        multiplier,
        gameMode,
        startTime,
        delay: 11000,
      },
      roomIds: globalRoomByGame,
    });

    this.monitor.info('===SLIDE: game updated to result state ===', {
      data: { gameId: cacheData.gameId, roundId, multiplier, gameMode },
    });

    gameRound
      .updateOne({
        status: MultiPlayerGameStates.RESULT,
        crashMultiplier: multiplier,
      })
      .catch((e) =>
        this.monitor.error(`Error updating DB for slide game ${gameRound.id}, roundId: ${roundId} to result status`, {
          error: e,
        }),
      );

    await this.timer(11000);
    this.handleGameCrash(cacheData);

    // Clear cache for game completed
    this.cacheService.batchDeleteKeys([
      getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode: GameCodes.SLIDE, gameMode }),
      getRedisCacheKeys(RedisCacheKeyEnum.TOTAL_BET_COUNT, { gameCode: GameCodes.SLIDE, roundId }),
      roundKey,
    ]);

    this.monitor.info('===SLIDE: createGame ended ===', { data: { gameMode } });
  }

  private async handleGameCrash(cacheData: IActiveGameCache) {
    const { gameId, roundId, gameMode, finalCrashMultiplier } = cacheData;
    try {
      this.monitor.info(`===SLIDE: handleGameCrash started for game ${gameId}, roundId ${roundId}===`);

      const roundKey = getRedisCacheKeys(RedisCacheKeyEnum.BET_LIST, { gameCode: GameCodes.SLIDE, roundId });
      const globalRoomByGame = getRoomNameByGame(GameCodes.SLIDE, gameMode);

      const allBetsMap = await this.cacheService.getSet<UserBet>({ key: roundKey });

      const rgsData: CreditInterface[] = [];
      const playerWiseWin: Record<
        string,
        {
          payout: number;
          bets: PlayerWiseBets[];
        }
      > = {};
      const bulkOps: BulkUpdateBetsInput[] = [];

      for (const [, bet] of allBetsMap) {
        bet.payout = 0;

        if (finalCrashMultiplier >= bet.targetMultiplier) {
          bet.payoutMultiplier = bet.targetMultiplier;
          bet.payout = bet.betAmount * bet.targetMultiplier;
        }

        const playerWiseBet: PlayerWiseBets = {
          betAmount: bet.betAmount,
          betId: bet.betId,
          payout: bet.payout,
          playerId: bet.playerId,
          roundId: bet.roundId,
          createdAt: bet.createdAt,
          targetMultiplier: bet.targetMultiplier,
        };

        if (playerWiseWin[bet.playerId]) {
          playerWiseWin[bet.playerId].payout += bet.payout;
          playerWiseWin[bet.playerId].bets.push(playerWiseBet);
        } else {
          playerWiseWin[bet.playerId] = {
            payout: bet.payout,
            bets: [playerWiseBet],
          };
        }

        bulkOps.push({
          active: false,
          payout: bet.payout,
          payoutMultiplier: bet.payoutMultiplier,
          betStatus: BetStatus.CREDIT_SUCCESS,
          betId: bet.betId,
          crashMultiplier: finalCrashMultiplier,
          roundId,
          seed: cacheData.seed,
          hash: cacheData.hash,
        });

        // TODO: Can trigger all bets event from here, for each bets

        rgsData.push({ ...bet, winAmount: bet.payout });
      }

      for (const playerId in playerWiseWin) {
        if (Object.prototype.hasOwnProperty.call(playerWiseWin, playerId)) {
          const winDetails = playerWiseWin[playerId];

          this.socketIOEmitterService.emit({
            eventName: SocketEvents.SLIDE_CASHOUT_RESPONSE,
            roomIds: playerId,
            data: {
              multiplier: finalCrashMultiplier,
              payout: winDetails.payout,
              playerId,
              gameMode,
              bets: winDetails.bets,
            },
          });
        }
      }

      const rgsResp = await this.rgsServiceInstance.credit(rgsData);

      const objCreditResp = rgsResp.reduce((acc, resp) => {
        acc[resp.transaction_id] = resp;
        return acc;
      }, {});

      for (const bet of bulkOps) {
        const creditResp = objCreditResp[bet.betId];

        bet.betStatus = creditResp ? BetStatus.CREDIT_SUCCESS : BetStatus.CREDIT_FAILED;
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

      this.slideRoundModel
        .updateOne({ _id: cacheData.gameId }, { status: MultiPlayerGameStates.ENDED })
        .catch((error) =>
          this.monitor.error('Slide: handleGameCrash: Error on game round update DB.', {
            error,
            data: { gameId, roundId },
          }),
        );

      this.cacheService.delCache(roundKey);

      this.monitor.info(`===SLIDE: handleGameCrash ended for game ${gameId}, roundId ${roundId}===`);
    } catch (error) {
      this.monitor.error('Error on slide handleGameSlide', { error, data: { gameId, roundId } });
    }
  }

  public async getRoundInfo(roundId: string): Promise<any> {
    const roundInfo = await this.slideRoundModel.findOne({ roundId, status: MultiPlayerGameStates.ENDED });

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
  ): Promise<SlideCurrentDayRoundResponseDTO[]> {
    query.skip = query.limit * (query.pageNo - 1);

    const { startOfDay, endOfDay } = this.getStartEndDay();

    const records = await this.slideRoundModel
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

    const mappedRec: SlideCurrentDayRoundResponseDTO[] = records.map((round) => ({
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
