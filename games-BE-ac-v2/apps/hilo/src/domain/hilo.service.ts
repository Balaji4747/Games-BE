import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { ServerError } from '@provfair/modules/graphql/errors/server/server.error';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { HILO_QUEUE } from '@provfair/shared/constants/Queue';
import { BetStatus, GameBeResultCodes, GameCodes, QueueJobs, RedisCacheKeyEnum } from '@provfair/shared/enums';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CommonService } from '@provfair/shared/services/common.service';
import { Queue } from 'bullmq';
import { HILO_MATH } from '../math/hilo';
import { HiloBetPlaceResponseDTO } from './dtos/hiloBetPlaceResponse.dto';
import { CardRankEnum, HiloGameConditions } from './enums';
import { HiloBetPlaceInput } from './inputs/hiloBetPlace.input';
import { HiloUserBet, IHiloCard, IHiloRound } from './interfaces/IHiloGameState';

@Injectable()
export class HiloService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly userServiceInstance: UsersService,
    private readonly userBetService: UserBetService,
    private readonly rgsServiceInstance: RgsService,
    private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly cacheService: CacheService,
    @InjectQueue(HILO_QUEUE) private hiloQueue: Queue,
  ) {
    super();
  }

  private async getExistingBetOrFail(currentUser: AuthUser) {
    const existingBet = await this.userBetService.findActiveBet(currentUser);

    if (!existingBet) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.INVALID_BET_HILO,
      });
    }

    return existingBet;
  }

  async nextCard(guess: HiloGameConditions, currentUser: AuthUser): Promise<HiloBetPlaceResponseDTO> {
    const { playerId } = currentUser;

    this.monitor.info('===Hilo: nextCard started for user ===', { data: playerId });

    const bet: HiloUserBet = await this.getExistingBetOrFail(currentUser);

    const { state, gameMode } = bet;

    if (
      guess === HiloGameConditions.skip &&
      state.rounds.filter((round) => round.guess === HiloGameConditions.skip)?.length >= 52
    ) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.INVALID_SKIP_HILO,
      });
    }

    let isFailedGuess = false;
    let isSkippedGuess = false;
    let lastCard: IHiloCard;
    const lastRound: IHiloRound = state.rounds.slice(-1).pop();
    const expectedOutcome = state.outcome[state.rounds.length];

    if (!lastRound?.payoutMultiplier) {
      this.monitor.debug('===Hilo: no proper round played by user ===', { data: { playerId, betId: bet.betId } });

      lastCard = state.startCard;
    } else {
      this.monitor.debug('===Hilo: last round info played by user ===', {
        data: { playerId, betId: bet.betId, lastRound },
      });

      lastCard = lastRound.card;
    }

    if (
      (lastCard.rank === CardRankEnum.ACE &&
        ![HiloGameConditions.high, HiloGameConditions.same, HiloGameConditions.skip].includes(guess)) ||
      (lastCard.rank === CardRankEnum.KING &&
        ![HiloGameConditions.low, HiloGameConditions.same, HiloGameConditions.skip].includes(guess))
    ) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.INVALID_GUESS_HILO,
      });
    }

    if (
      ![CardRankEnum.KING, CardRankEnum.ACE].includes(lastCard.rank) &&
      ![HiloGameConditions.higherEqual, HiloGameConditions.skip, HiloGameConditions.lowerEqual].includes(guess)
    ) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.INVALID_GUESS_HILO,
      });
    }

    const _lastCardPayoutInfo = HILO_MATH[gameMode].multiplierMap.find((el) => lastCard.rank === el.rank);

    let selectedMultiplier = 0;
    const rankValue = HILO_MATH.rankValue[lastCard.rank];

    switch (guess) {
      case HiloGameConditions.low:
        isFailedGuess = rankValue <= expectedOutcome.rankValue;
        selectedMultiplier = _lastCardPayoutInfo.multiplierLow;
        break;
      case HiloGameConditions.high:
        isFailedGuess = rankValue >= expectedOutcome.rankValue;
        selectedMultiplier = _lastCardPayoutInfo.multiplierHigh;
        break;
      case HiloGameConditions.same:
        isFailedGuess = rankValue !== expectedOutcome.rankValue;
        selectedMultiplier = _lastCardPayoutInfo.multiplierHigh;

        if (lastCard.rank === CardRankEnum.KING) {
          selectedMultiplier = _lastCardPayoutInfo.multiplierLow;
        }

        break;
      case HiloGameConditions.higherEqual:
        isFailedGuess = rankValue > expectedOutcome.rankValue ? true : false;
        selectedMultiplier = _lastCardPayoutInfo.multiplierHigh;
        break;
      case HiloGameConditions.lowerEqual:
        isFailedGuess = rankValue < expectedOutcome.rankValue ? true : false;
        selectedMultiplier = _lastCardPayoutInfo.multiplierLow;
        break;
      case HiloGameConditions.skip:
        isSkippedGuess = true;
        break;
    }

    const _payoutMultiplier = selectedMultiplier * (lastRound?.payoutMultiplier || 1);
    const newRound: IHiloRound = {
      card: {
        suit: expectedOutcome.card.split('-')[1],
        rank: expectedOutcome.card.split('-')[0],
      },
      guess,
      payoutMultiplier: 0,
    };

    if (isFailedGuess) {
      newRound.payoutMultiplier = 0;
    } else if (isSkippedGuess) {
      newRound.payoutMultiplier = lastRound?.payoutMultiplier || 0.99;
    } else {
      newRound.payoutMultiplier = _payoutMultiplier;
    }

    bet.state.rounds.push(newRound);

    const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.HILO });
    await this.cacheService.redis.set(cacheKey, JSON.stringify(bet), 'KEEPTTL');

    this.userBetService.updateBet(bet.betId, { $push: { 'state.rounds': newRound } }).catch((e) =>
      this.monitor.error('Hilo: nextCard: Update bet for newRound', {
        error: e,
        data: { betId: bet.betId, newRound },
      }),
    );

    if (bet.state.rounds.length >= 104 || isFailedGuess) {
      this.monitor.debug(
        '===Hilo: max prediction done by the user or wrong prediction being made hence cashing out===',
        { data: { betId: bet.betId, playerId } },
      );

      return this.cashOut(currentUser, bet);
    }

    this.monitor.info('===Hilo: nextCard ended for user ===', { data: { betId: bet.betId, playerId } });

    return {
      gameCode: GameCodes.HILO,
      roundId: bet.roundId,
      betId: bet.betId,
      hiloState: { rounds: bet.state.rounds, startCard: bet.state.startCard },
      betAmount: bet.betAmount,
      date: bet.createdAt,
      active: !isFailedGuess,
      payout: 0,
      payoutMultiplier: 0,
    };
  }

  public async cashOut(currentUser: AuthUser, bet?: HiloUserBet): Promise<HiloBetPlaceResponseDTO> {
    const { playerId } = currentUser;

    this.monitor.info('===Hilo: cashOut started for user ===', { data: playerId });

    if (!bet) {
      bet = await this.getExistingBetOrFail(currentUser);
    }

    const { betId, roundId, betStatus } = bet;

    if (betStatus !== BetStatus.DEBIT_SUCCESS && betStatus !== BetStatus.CREDIT_FAILED) {
      this.monitor.warn('Hilo: cannot cashout as bet is not on DEBIT_SUCCESS/CREDIT_FAILED status', {
        data: { betId, betStatus },
      });
      throw new Error('Invalid bet status');
    }

    //Don't allow cashout if user has not played atleast single round
    if (!bet.state?.rounds.length) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.INVALID_CASHOUT_HILO,
      });
    }

    const lastRound: IHiloRound = bet.state.rounds.slice(-1).pop();
    const payout = bet.betAmount * lastRound.payoutMultiplier;
    const payoutMultiplier = lastRound.payoutMultiplier;

    await this.userBetService.updateBet(bet.betId, {
      $set: {
        active: false,
        betStatus: BetStatus.CREDIT_STARTED,
        payout,
        payoutMultiplier,
      },
    });

    this.rgsServiceInstance
      .credit([
        {
          token: bet.token,
          playerId,
          winAmount: payout,
          payoutMultiplier,
          betId,
          roundId,
          gameCode: GameCodes.HILO,
          clientSeed: bet.clientSeed,
          serverSeed: bet.serverSeed,
          hashedServerSeed: bet.hashedServerSeed,
          nonce: bet.nonce,
        },
      ])
      .then((resp) => {
        this.userBetService
          .updateBet(bet.betId, {
            $set: {
              active: false,
              betStatus: BetStatus.CREDIT_SUCCESS,
            },
          })
          .catch((e) =>
            this.monitor.error(
              `Error updating userBet to status CREDIT_SUCCESS for hilo, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      })
      .catch((error) => {
        // TODO: Handle RGS error here, and if failed this can be retired

        this.monitor.error('Error on RGS credit call from hilo betPlace', {
          error,
          data: { betId, roundId },
        });

        this.userBetService
          .updateBet(bet.betId, {
            $set: {
              betStatus: BetStatus.CREDIT_FAILED,
              err: error,
              active: false,
            },
          })
          .catch((e) =>
            this.monitor.error(
              `Error updating userBet to status CREDIT_FAILED for hilo, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      });

    const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.HILO });

    const [deletedFromCache, removedFromQueue] = await Promise.all([
      this.cacheService.delCache(cacheKey),
      this.hiloQueue.remove(bet.betId),
    ]);

    this.monitor.debug('Hilo:cashOut: cache cleared.', { data: { deletedFromCache, removedFromQueue } });

    this.monitor.info('===Hilo: cashOut ended for user ===', { data: { playerId, betId: bet.betId } });

    return {
      gameCode: GameCodes.HILO,
      roundId: bet.roundId,
      betId: bet.betId,
      hiloState: { rounds: bet.state.rounds, startCard: bet.state.startCard },
      betAmount: bet.betAmount,
      date: bet.createdAt,
      active: false,
      payout,
      payoutMultiplier,
    };
  }

  async betPlace(input: HiloBetPlaceInput, currentUser: AuthUser): Promise<HiloBetPlaceResponseDTO> {
    const { gameMode, operatorId, token, playerId } = currentUser;
    const { currency, betAmount, rank, suit } = input;

    this.monitor.info(`===Hilo betPlace started ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetailsOrFail({ playerId: currentUser.playerId, operatorId });

    const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.HILO });
    const existingBet: UserBet = await this.cacheService.getCache(cacheKey);
    if (existingBet) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.BET_OPEN_HILO,
      });
    }

    const [betId, roundId] = await Promise.all([this.generateUUid(), this.generateUUid()]);

    const userBetInfo: UserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      gameCode: GameCodes.HILO,
      clientSeed: user.clientSeed,
      serverSeed: user.serverSeed,
      hashedServerSeed: user.hashedServerSeed,
      nonce: user.nonce,
      gameMode,
      currency,
      betAmount,
      payout: 0,
      payoutMultiplier: 0,
      active: true,
      betId,
      roundId,
      avatar: user.avatar,
      betStatus: BetStatus.DEBIT_STARTED,
      balance: 0,
    };

    try {
      const { balance } = await this.rgsServiceInstance.debit({
        token,
        playerId,
        amount: betAmount,
        betId,
        roundId,
        gameCode: GameCodes.HILO,
      });

      userBetInfo.balance = balance;
      userBetInfo.betStatus = BetStatus.DEBIT_SUCCESS;
    } catch (error) {
      userBetInfo.betStatus = BetStatus.DEBIT_FAILED;
      userBetInfo.active = false;
      userBetInfo.err = error;

      this.userBetService.create(userBetInfo);

      throw error;
    }

    this.socketIOEmitterService.emitPlayerBalanceUpdate({ balance: userBetInfo.balance, playerId });

    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      user.serverSeed,
      user.clientSeed,
      user.nonce,
      GameCodes.HILO,
    );

    const outcome = generatedTarget.reduce((map, curr) => {
      const card = HILO_MATH.suitOrder[Math.floor(curr)];

      const _map = {
        index: Math.floor(curr),
        card,
        rankValue: HILO_MATH.rankValue[card.split('-')[0]],
      };

      return [...map, { ..._map }];
    }, []);

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });
    userBetInfo.nonce = user.nonce;
    userBetInfo.state = { rounds: [], startCard: { rank, suit }, outcome };

    const userBetRec = await this.userBetService.create(userBetInfo);

    await this.cacheService.setCache({
      key: cacheKey,
      data: userBetRec.toJSON(),
      expire: 24.5 * 3600,
    });

    this.hiloQueue.add(QueueJobs.HILO_SETTLE_BET, { betId }, { delay: 24 * 3600 * 1000, jobId: betId }); // This will check the job status after 24hrs, if the bet is still open then close the bet and refund the money.

    this.monitor.info(`===Hilo betPlace ended with data ===`, { data: { input } });

    return {
      roundId,
      betId,
      payout: 0,
      payoutMultiplier: 0,
      hiloState: { rounds: [], startCard: { rank, suit } },
      gameCode: GameCodes.HILO,
      date: userBetRec.createdAt,
      betAmount,
      active: true,
    };
  }

  async payTable(currentUser: AuthUser) {
    const { gameMode } = currentUser;
    return HILO_MATH[gameMode].multiplierMap;
  }

  public async autoSettleBet(data: { betId: string }): Promise<void> {
    const { betId } = data;

    this.monitor.info('===Hilo: autoSettle bet started ===', { data: { betId } });

    try {
      const userBet = await this.userBetService.findBetCacheOrFallBack(betId);

      if (!userBet) {
        this.monitor.info('===Hilo: autoSettle bet, no user bet found ===', { data: { betId } });
        return;
      } else if (userBet.betStatus !== BetStatus.DEBIT_SUCCESS) {
        this.monitor.info('===Hilo: autoSettle bet, not in DEBIT_SUCCESS status ===', {
          data: { betId, status: userBet.betStatus },
        });
        return;
      }

      const { token, playerId, roundId, gameCode, betAmount } = userBet;

      try {
        await this.rgsServiceInstance.refund({ token, playerId, betId, roundId, gameCode, amount: betAmount });
      } catch (error) {
        this.monitor.error('Error on RGS refund call from hilo autoSettleBet', {
          error,
          data: { betId, roundId },
        });
      }

      await this.userBetService.updateBet(betId, {
        $set: {
          active: false,
          betStatus: BetStatus.REFUND,
          reason: 'Auto settled open bet',
        },
      });

      const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.HILO });

      await this.cacheService.delCache(cacheKey);

      this.monitor.info('===Hilo: autoSettle bet ended ===', { data: { betId } });
    } catch (error) {
      this.monitor.error('===Hilo: autoSettle bet error ===', { error, data: { betId } });
    }
  }
}
