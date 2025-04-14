import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AviatorxLastRoundDTO } from '@provfair/apps/aviatorx/src/domain/dtos/lastRound-response.dto';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { MonitoringService } from '@provfair/monitoring';
import { BetStatus, GameCodes, GameMode, MultiplayerGames, RedisCacheKeyEnum } from '@provfair/shared/enums';
import { UserBetType } from '@provfair/shared/enums/userBets.enum';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { getRemainingTime } from '@provfair/shared/helpers/getRemainingTime';
import { ActiveGameInput } from '@provfair/shared/inputs';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';
import { CommonService } from '@provfair/shared/services/common.service';
import { AnyBulkWriteOperation, FilterQuery, UpdateQuery } from 'mongoose';
import { ActiveGameResponseDTO } from '../dtos/activeGame-response.dto';
import { AviatorxLastRoundBetsDTO } from '../dtos/aviatorxLastRoundBets-response.dto';
import { BetInfoResponseDTO } from '../dtos/betInfo-response.dto';
import { BulkUpdateUserBetResponseDTO } from '../dtos/bulkUpdateUserBet-response.dto';
import { LastRoundBetsDTO } from '../dtos/lastRoundBets-response.dto';
import { UserBetsResponseDTO } from '../dtos/userBets-response.dto';
import { BulkUpdateUserBetInput } from '../inputs/bulkUpdateUserBet.input';
import { UserBetsInput } from '../inputs/userBets.input';
import { UserBet, UserBetDocument, UserBetModel } from '../schema/userBet.schema';
import { UsersService } from './users.service';

@Injectable()
export class UserBetService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly cacheService: CacheService,
    private readonly userService: UsersService,
    @InjectModel(UserBet.name) private userBetModel: UserBetModel,
  ) {
    super();
  }

  public async create(data: Partial<UserBet>) {
    return this.userBetModel.create(data);
  }

  public async findBetCacheOrFallBack(betId: string, roundKey?: string): Promise<UserBet> {
    let bet: UserBet = null;

    if (roundKey) {
      bet = await this.cacheService.getElementFromSet({ key: roundKey, field: betId });

      if (bet) {
        return bet;
      }
    }

    bet = await this.userBetModel.findOne({ betId });

    return bet;
  }

  public async updateBet(betId: string, updateData: UpdateQuery<UserBet>) {
    return this.userBetModel.updateOne({ betId }, updateData);
  }

  public async bulkUpdateBet(input: BulkUpdateUserBetInput): Promise<BulkUpdateUserBetResponseDTO> {
    const { bets, finalCrashMultiplier: crashMultiplier, roundId, hash, seed } = input;

    const bulkOps: AnyBulkWriteOperation<UserBet>[] = [];
    const betIds = [];

    for (const bet of bets) {
      const { betId, ...dataToUpdate } = bet;

      betIds.push(betId);

      bulkOps.push({
        updateOne: {
          filter: {
            betId,
          },
          update: {
            $set: dataToUpdate,
          },
        },
      });
    }

    // Update all the bets for this round for the final crash multiplier, this will help in reporting and we don't need to go to different rounds table for crash point.
    if (bulkOps?.length) {
      await Promise.all([
        this.userBetModel.bulkWrite(bulkOps),
        this.userBetModel.updateMany({ roundId, betId: { $nin: betIds } }, { $set: { crashMultiplier, hash, seed } }),
      ]);
    } else {
      await this.userBetModel.updateMany({ roundId }, { $set: { crashMultiplier, hash, seed } });
    }

    return { ok: true };
  }

  public async activeGameInfo(input: ActiveGameInput, currentUser: AuthUser): Promise<ActiveGameResponseDTO | null> {
    const { gameMode, playerId } = currentUser;
    let { gameCode } = input;
    gameCode = gameCode ?? currentUser.gameCode;

    const currentGame: IActiveGameCache = await this.cacheService.getCache(
      getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_GAME, { gameCode, gameMode }),
    );

    if (!currentGame) {
      return null;
    }

    const {
      gameId,
      roundId,
      status,
      currentMultiplier,
      nextGameHashedSeed,
      numbers,
      startTime,
      gameEndIn,
      acceptBetEndTime,
      acceptBetDelay,
    } = currentGame;

    const activeGame: ActiveGameResponseDTO = {
      gameId,
      roundId,
      status,
      currentMultiplier,
      nextGameHashedSeed,
      numbers,
      startTime,
      gameMode,
      bets: [],
      acceptBetDelay,
    };

    const bets = await this.userBetModel.find({
      roundId,
      betStatus: { $in: [BetStatus.DEBIT_SUCCESS, BetStatus.CREDIT_SUCCESS] },
      playerId,
      gameCode,
    });

    // Check if bet have autoCash out and it is cashed out or not.
    // There is a rare case when Auto cashOut settlement takes time to settle and hence the bet remains in DEBIT_SUCCESS status, so for such bets change the status to CREDIT_SUCCESS
    for (const bet of bets) {
      if (bet.betStatus === BetStatus.DEBIT_SUCCESS && bet.cashOutAt && bet.cashOutAt < currentMultiplier) {
        bet.payout = bet.betAmount * bet.cashOutAt;
        bet.payoutMultiplier = bet.cashOutAt;
        bet.betStatus = BetStatus.CREDIT_SUCCESS;
      }
    }

    activeGame.bets = bets;

    if (startTime) {
      activeGame.gameEndIn = this.getTimeLeft(startTime, gameEndIn);
    }

    if (acceptBetEndTime) {
      activeGame.delay = getRemainingTime(acceptBetEndTime);
    }

    return activeGame;
  }

  public async aviatorxGetLastRoundBets(gameMode: GameMode): Promise<AviatorxLastRoundBetsDTO[]> {
    const key = getRedisCacheKeys(RedisCacheKeyEnum.LAST_ROUND_LIST, { gameCode: GameCodes.AVIATORX, gameMode });

    const lastRounds = await this.cacheService.getList({ key, start: 0, stop: 1 });

    if (!lastRounds?.length) {
      return [];
    }

    const lastRound: AviatorxLastRoundDTO = JSON.parse(lastRounds[0]);

    const list = await this.userBetModel.find({
      roundId: lastRound.roundId,
      betStatus: BetStatus.CREDIT_SUCCESS,
    });

    return list;
  }

  public async lastRoundBets(currentUser: AuthUser, gameMode: GameMode): Promise<LastRoundBetsDTO[]> {
    if (![GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP].includes(currentUser.gameCode)) {
      return [];
    }

    const key = getRedisCacheKeys(RedisCacheKeyEnum.LAST_ROUND_LIST, { gameCode: currentUser.gameCode, gameMode });

    const lastRounds = await this.cacheService.getList({ key, start: 0, stop: 1 });

    if (!lastRounds?.length) {
      return [];
    }

    const lastRound: { roundId: string; crashMultiplier: number } = JSON.parse(lastRounds[0]);

    const list = await this.userBetModel.find({
      roundId: lastRound.roundId,
      betStatus: BetStatus.CREDIT_SUCCESS,
    });

    return list;
  }

  public async getUserBets(input: UserBetsInput, currentUser: AuthUser): Promise<UserBetsResponseDTO[]> {
    const { gameMode, playerId } = currentUser;

    input.skip = input.limit * (input.pageNo - 1);
    const { type = UserBetType.MY, gameCode, roundId } = input;

    const { startOfMonth, endOfMonth } = this.getStartEndMonth();

    let query: FilterQuery<UserBet> = {};

    if (roundId) {
      query = {
        roundId,
        betStatus: BetStatus.CREDIT_SUCCESS,
      };
    } else {
      if (type === UserBetType.ALL) {
        query = {
          gameCode: gameCode ?? { $nin: [GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP] },
          gameMode,
          betStatus: BetStatus.CREDIT_SUCCESS,
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        };
      } else {
        query = {
          gameCode: gameCode ?? { $nin: [GameCodes.AVIATORX, GameCodes.PCRASH, GameCodes.BUTTONPOP] },
          gameMode,
          betStatus: BetStatus.CREDIT_SUCCESS,
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
          playerId,
        };
      }
    }

    return this.userBetModel.find(query).sort('-createdAt').skip(input.skip).limit(input.limit) as any;
  }

  public async findActiveBet(currentUser: AuthUser, gameCode?: GameCodes) {
    const { playerId } = currentUser;

    gameCode = gameCode ?? currentUser.gameCode;

    const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { gameCode, playerId });

    let existingBet: UserBet = await this.cacheService.getCache(cacheKey);

    if (existingBet) {
      this.monitor.debug('Found existing bet from redis cache', { data: { gameCode, betId: existingBet.betId } });

      return existingBet;
    }

    existingBet = await this.userBetModel.findOne({ gameCode, playerId, active: true });

    if (existingBet) {
      this.monitor.debug('Found existing bet from DB', { data: { gameCode, betId: existingBet.betId } });

      const objBet = (existingBet as UserBetDocument).toJSON();

      await this.cacheService.setCache({
        key: cacheKey,
        data: objBet,
        expire: 24.5 * 3600,
      });
    }

    return existingBet;
  }

  // Note: The currentUser here can be an admin user too, which can only have "isAdmin" property. If you are planning to use any other property from this currentUser do a null check and then use. As, this method is called by both player and admin.
  public async betInfo(betId: string, currentUser: AuthUser): Promise<BetInfoResponseDTO> {
    const bet = await this.userBetModel.findOne({ betId });

    if (!bet) {
      return null;
    }

    const betObj = bet.toJSON();

    const { playerId, operatorId } = betObj;
    let { serverSeed } = betObj;

    const user = await this.userService.getUserDetails({ playerId, operatorId });

    if (bet.betStatus !== BetStatus.CREDIT_SUCCESS) {
      // Don't reveal sensitive information before round completion
      delete betObj.crashMultiplier;

      if (betObj.state) {
        delete betObj.state.outcome;
        delete betObj.state.mines;
      }
    }

    if (bet.gameCode === GameCodes.HILO && betObj.state) {
      delete betObj.state.outcome;
    }

    if (!MultiplayerGames.includes(bet.gameCode) && bet.active) {
      serverSeed = null;
    }

    return { ...betObj, serverSeed: user?.serverSeed === serverSeed ? null : serverSeed };
  }
}
