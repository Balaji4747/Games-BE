import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { RedlockClientConfigService } from '@provfair/configuration/redlock-client/configuration.service';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { ServerError } from '@provfair/modules/graphql/errors/server/server.error';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import { RedlockClient } from '@provfair/modules/redlock/redlock.client';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { BOTTLESMASH_QUEUE } from '@provfair/shared/constants/Queue';
import { BetStatus, GameBeResultCodes, GameCodes, QueueJobs, RedisCacheKeyEnum } from '@provfair/shared/enums';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CommonService } from '@provfair/shared/services/common.service';
import { Queue } from 'bullmq';
import { Lock } from 'redlock';
import { MINES_MATH } from '../math/bottlesmash';
import { BottleSmashBetPlaceResponseDTO } from './dtos/bottlesmashBetPlaceResponse.dto';
import { BottleSmashAutoBetPlaceInput, BottleSmashBetPlaceInput } from './inputs/bottlesmashBetPlace.input';
import { BottleSmashUserBet, IBottleSmashRound } from './interfaces/IBottleGameState';

@Injectable()
export class BottleSmashService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly userServiceInstance: UsersService,
    private readonly userBetService: UserBetService,
    private readonly rgsServiceInstance: RgsService,
    private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly cacheService: CacheService,
    private readonly redlockClient: RedlockClient,
    private readonly redlockConfigService: RedlockClientConfigService,
    @InjectQueue(BOTTLESMASH_QUEUE) private queue: Queue,
  ) {
    super();
  }

  private async getExistingBetOrFail(currentUser: AuthUser) {
    const existingBet = await this.userBetService.findActiveBet(currentUser);

    if (!existingBet) {
      this.monitor.error('BottleSmash bet not found.', { data: { currentUser } });

      throw new ServerError({
        context: this,
        code: GameBeResultCodes.INVALID_BET_MINES,
      });
    }

    return existingBet;
  }

  async nextMine(position: number, currentUser: AuthUser): Promise<BottleSmashBetPlaceResponseDTO> {
    const { playerId, gameCode } = currentUser;

    if (gameCode !== GameCodes.BOTTLESMASH) {
      this.monitor.error(
        'BottleSmash: nextMine: Invalid game code passed, please use the correct token assigned for this game.',
        { data: { gameCode, playerId } },
      );
      throw new ServerError({ context: this, code: GameBeResultCodes.INVALID_GAMECODE_MINES });
    }

    this.monitor.info('===BottleSmash: nextMine started for user ===', { data: playerId });

    let locker: Lock;
    try {
      const lockKey = `be:lock:bottlesmash:cashout:${playerId}`;
      locker = await this.redlockClient.lock(lockKey, this.redlockConfigService.redlock.ttl);

      const bet: BottleSmashUserBet = await this.getExistingBetOrFail(currentUser);

      const { state, gameMode, betAmount } = bet;

      if (state.rounds.find((el) => el.field === position)) {
        throw new ServerError({
          context: this,
          code: GameBeResultCodes.FIELD_SELECTED_MINES,
        });
      }

      const isMineSelected = state.mines.includes(position);
      let isGameEnded = false;
      let payoutMultiplier = 0;

      if (!isMineSelected) {
        const multiplierDetails = MINES_MATH[gameMode].multiplierMap[state.mineCount - 1][state.rounds.length];
        payoutMultiplier = multiplierDetails.multiplier;

        if (state.rounds.length + state.mineCount + 1 === 25) {
          isGameEnded = true;
        }
      }

      const payout = betAmount * payoutMultiplier;
      const newRound: IBottleSmashRound = {
        field: position,
        payoutMultiplier,
      };
      bet.state.rounds.push(newRound);
      bet.payout = payout;
      bet.payoutMultiplier = payoutMultiplier;

      const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.BOTTLESMASH });
      await this.cacheService.redis.set(cacheKey, JSON.stringify(bet), 'KEEPTTL');

      this.userBetService
        .updateBet(bet.betId, { $push: { 'state.rounds': newRound }, payout, payoutMultiplier })
        .catch((e) =>
          this.monitor.error('BottleSmash: nextMine: Update bet for newRound', {
            error: e,
            data: { betId: bet.betId, newRound },
          }),
        );

      if (isGameEnded || isMineSelected) {
        this.monitor.info('===BottleSmash:nextMine: Game comes to an end===', { data: { betId: bet.betId, playerId } });

        return this.cashOut(currentUser, bet);
      }

      this.monitor.info('===BottleSmash: nextMine ended for user ===', { data: { betId: bet.betId, playerId } });

      return {
        gameCode: GameCodes.BOTTLESMASH,
        roundId: bet.roundId,
        betId: bet.betId,
        minesState: { rounds: bet.state.rounds, mineCount: bet.state.mineCount },
        betAmount: bet.betAmount,
        date: bet.createdAt,
        payout,
        payoutMultiplier,
      };
    } catch (error) {
      throw error;
    } finally {
      this.redlockClient.unlock(locker);
    }
  }

  public async cashOut(currentUser: AuthUser, bet?: BottleSmashUserBet): Promise<BottleSmashBetPlaceResponseDTO> {
    const { playerId } = currentUser;

    this.monitor.info('===BottleSmash: cashOut started for user ===', { data: playerId });

    let locker: Lock;
    try {
      if (!bet) {
        const lockKey = `be:lock:bottlesmash:cashout:${playerId}`;
        locker = await this.redlockClient.lock(lockKey, this.redlockConfigService.redlock.ttl);

        bet = await this.getExistingBetOrFail(currentUser);
      }

      const { betId, roundId, betStatus } = bet;

      if (betStatus !== BetStatus.DEBIT_SUCCESS && betStatus !== BetStatus.CREDIT_FAILED) {
        this.monitor.warn('BottleSmash: cannot cashout as bet is not on DEBIT_SUCCESS/CREDIT_FAILED status', {
          data: { betId, betStatus },
        });
        throw new Error('Invalid bet status');
      }

      //Don't allow cashout if user has not played atleast single round
      if (!bet.state?.rounds.length) {
        throw new ServerError({
          context: this,
          code: GameBeResultCodes.INVALID_CASHOUT_MINES,
        });
      }

      const lastRound: IBottleSmashRound = bet.state.rounds.slice(-1).pop();
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
            gameCode: GameCodes.BOTTLESMASH,
            clientSeed: bet.clientSeed,
            serverSeed: bet.serverSeed,
            hashedServerSeed: bet.hashedServerSeed,
            nonce: bet.nonce,
          },
        ])
        .then((resp) => {
          const rgsData = resp?.find((r) => r.transaction_id === betId);

          if (rgsData) {
            this.userBetService
              .updateBet(bet.betId, {
                $set: {
                  active: false,
                  payout,
                  payoutMultiplier,
                  betStatus: BetStatus.CREDIT_SUCCESS,
                  balance: rgsData.balance,
                },
              })
              .catch((e) =>
                this.monitor.error(
                  `Error updating userBet to status CREDIT_SUCCESS for bottlesmash, roundId: ${roundId}, betId: ${betId}`,
                  { error: e },
                ),
              );
          } else {
            throw new Error('Bet data not found in RGS credit response.');
          }
        })
        .catch((error) => {
          // TODO: Handle RGS error here, and if failed this can be retired

          this.monitor.error('Error on RGS credit call from bottlesmash betPlace', {
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
                `Error updating userBet to status CREDIT_FAILED for bottlesmash, roundId: ${roundId}, betId: ${betId}`,
                { error: e },
              ),
            );
        });

      const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.BOTTLESMASH });

      const [deletedFromCache, removedFromQueue] = await Promise.all([
        this.cacheService.delCache(cacheKey),
        this.queue.remove(bet.betId),
      ]);

      this.monitor.info('===BottleSmash: cashOut ended for user ===', {
        data: { playerId, betId: bet.betId, deletedFromCache, removedFromQueue },
      });

      return {
        gameCode: GameCodes.BOTTLESMASH,
        roundId: bet.roundId,
        betId: bet.betId,
        minesState: bet.state,
        betAmount: bet.betAmount,
        date: bet.createdAt,
        payout,
        payoutMultiplier,
      };
    } catch (error) {
      throw error;
    } finally {
      this.redlockClient.unlock(locker);
    }
  }

  async betPlace(input: BottleSmashBetPlaceInput, currentUser: AuthUser): Promise<BottleSmashBetPlaceResponseDTO> {
    const { gameMode, operatorId, token, playerId } = currentUser;
    const { currency, betAmount, mineCount } = input;

    this.monitor.info(`===BottleSmash betPlace started ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetailsOrFail({ playerId: currentUser.playerId, operatorId });

    const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.BOTTLESMASH });
    const existingBet: UserBet = await this.cacheService.getCache(cacheKey);
    if (existingBet) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.BET_OPEN_MINES,
      });
    }

    const [betId, roundId] = await Promise.all([this.generateUUid(), this.generateUUid()]);

    const userBetInfo: BottleSmashUserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      gameCode: GameCodes.BOTTLESMASH,
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
        gameCode: GameCodes.BOTTLESMASH,
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
      GameCodes.BOTTLESMASH,
    );

    const initialTiles = Array.from(Array(25).keys());

    const mines = generatedTarget.map((index) => {
      const mine_index = Math.floor(index);
      const mine_location = initialTiles[mine_index];
      initialTiles.splice(index, 1);
      return mine_location;
    });

    const minesPositions = mines.slice(0, mineCount);

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });
    userBetInfo.nonce = user.nonce;
    userBetInfo.state = { rounds: [], mineCount, mines: minesPositions };

    const userBetRec = await this.userBetService.create(userBetInfo);

    await this.cacheService.setCache({
      key: cacheKey,
      data: userBetRec.toJSON(),
      expire: 24.5 * 3600,
    });

    this.queue.add(QueueJobs.BOTTLESMASH_SETTLE_BET, { betId }, { delay: 24 * 3600 * 1000, jobId: betId }); // This will check the job status after 24hrs, if the bet is still open then close the bet and refund the money.

    this.monitor.info(`===BottleSmash betPlace ended with data ===`, { data: { input, betId } });

    return {
      roundId,
      betId,
      payout: 0,
      payoutMultiplier: 0,
      minesState: { rounds: [], mineCount },
      gameCode: GameCodes.BOTTLESMASH,
      date: userBetRec.createdAt,
      betAmount,
    };
  }

  async payTable(currentUser: AuthUser) {
    const { gameMode } = currentUser;
    return MINES_MATH[gameMode].multiplierMap;
  }

  public async autoSettleBet(data: { betId: string }): Promise<void> {
    const { betId } = data;

    this.monitor.info('===BottleSmash: autoSettle bet started ===', { data: { betId } });

    try {
      const userBet = await this.userBetService.findBetCacheOrFallBack(betId);

      if (!userBet) {
        this.monitor.info('===BottleSmash: autoSettle bet, no user bet found ===', { data: { betId } });
        return;
      } else if (userBet.betStatus !== BetStatus.DEBIT_SUCCESS) {
        this.monitor.info('===BottleSmash: autoSettle bet, not in DEBIT_SUCCESS status ===', {
          data: { betId, status: userBet.betStatus },
        });
        return;
      }

      const { token, playerId, roundId, gameCode, betAmount } = userBet;

      try {
        await this.rgsServiceInstance.refund({ token, playerId, betId, roundId, gameCode, amount: betAmount });
      } catch (error) {
        this.monitor.error('Error on RGS refund call from mines autoSettleBet', {
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

      const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.BOTTLESMASH });

      await this.cacheService.delCache(cacheKey);

      this.monitor.info('===BottleSmash: autoSettle bet ended ===', { data: { betId } });
    } catch (error) {
      this.monitor.error('===BottleSmash: autoSettle bet error ===', { error, data: { betId } });
    }
  }

  public async autoBet(
    input: BottleSmashAutoBetPlaceInput,
    currentUser: AuthUser,
  ): Promise<BottleSmashBetPlaceResponseDTO> {
    const { gameMode, operatorId, token, playerId } = currentUser;
    const { currency, betAmount, mineCount, positions } = input;

    this.monitor.info(`===BottleSmash autoBet started ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetailsOrFail({ playerId: currentUser.playerId, operatorId });

    const cacheKey = getRedisCacheKeys(RedisCacheKeyEnum.ACTIVE_BET, { playerId, gameCode: GameCodes.BOTTLESMASH });
    const existingBet: UserBet = await this.cacheService.getCache(cacheKey);
    if (existingBet) {
      throw new ServerError({
        context: this,
        code: GameBeResultCodes.BET_OPEN_MINES,
      });
    }

    const [betId, roundId] = await Promise.all([this.generateUUid(), this.generateUUid()]);

    const userBetInfo: BottleSmashUserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      gameCode: GameCodes.BOTTLESMASH,
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
        gameCode: GameCodes.BOTTLESMASH,
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

    const userBetRec = await this.userBetService.create(userBetInfo);

    this.socketIOEmitterService.emitPlayerBalanceUpdate({ balance: userBetInfo.balance, playerId });

    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      user.serverSeed,
      user.clientSeed,
      user.nonce,
      GameCodes.BOTTLESMASH,
    );

    const initialTiles = Array.from(Array(25).keys());

    const mines = generatedTarget.map((index) => {
      const mine_index = Math.floor(index);
      const mine_location = initialTiles[mine_index];
      initialTiles.splice(index, 1);
      return mine_location;
    });

    const minesPositions = mines.slice(0, mineCount);

    const isCrashed = positions.some((e) => minesPositions.includes(e));
    const multiplierDetails = MINES_MATH[gameMode].multiplierMap[mineCount - 1];
    let payout = 0;
    let payoutMultiplier = 0;
    let rounds: IBottleSmashRound[] = [];

    if (isCrashed) {
      payout = 0;
      payoutMultiplier = 0;

      let lastPositionMultiplier: number = null;
      for (let index = 0; index < positions.length; index++) {
        const position = positions[index];

        if (!minesPositions.includes(position) && lastPositionMultiplier !== 0) {
          lastPositionMultiplier = multiplierDetails[index].multiplier;
        } else {
          lastPositionMultiplier = 0;
        }

        rounds.push({ field: position, payoutMultiplier: lastPositionMultiplier });
      }
    } else {
      rounds = positions.map((pos, index) => ({ field: pos, payoutMultiplier: multiplierDetails[index].multiplier }));

      payoutMultiplier = multiplierDetails[rounds.length - 1].multiplier;
      payout = payoutMultiplier * betAmount;
    }

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });
    userBetRec.nonce = user.nonce;
    userBetRec.state = { rounds, mineCount, mines: minesPositions };
    userBetRec.betStatus = BetStatus.CREDIT_STARTED;
    userBetRec.payout = payout;
    userBetRec.payoutMultiplier = payoutMultiplier;
    await userBetRec.save();

    this.rgsServiceInstance
      .credit([
        {
          token,
          playerId,
          winAmount: payout,
          betId,
          roundId,
          gameCode: GameCodes.BOTTLESMASH,
          clientSeed: user.clientSeed,
          serverSeed: user.serverSeed,
          hashedServerSeed: user.hashedServerSeed,
          nonce: user.nonce,
          payoutMultiplier,
        },
      ])
      .then((resp) => {
        userBetRec
          .updateOne({
            $set: {
              active: false,
              betStatus: BetStatus.CREDIT_SUCCESS,
            },
          })
          .catch((e) =>
            this.monitor.error(
              `autoBet: Error updating userBet to status CREDIT_SUCCESS for BOTTLESMASH, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      })
      .catch((error) => {
        // TODO: Handle RGS error here, and if failed this can be retired

        this.monitor.error('autoBet: Error on RGS credit call from BOTTLESMASH betPlace', {
          error,
          data: { betId, roundId },
        });

        userBetRec
          .updateOne({ $set: { betStatus: BetStatus.CREDIT_FAILED, err: error, active: false } })
          .catch((e) =>
            this.monitor.error(
              `autoBet: Error updating userBet to status CREDIT_FAILED for BOTTLESMASH, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      });

    this.monitor.info(`===BottleSmash autoBet ended with data ===`, { data: { input, betId } });

    return {
      roundId,
      betId,
      payout,
      payoutMultiplier,
      minesState: userBetRec.state,
      gameCode: GameCodes.BOTTLESMASH,
      date: userBetRec.createdAt,
      betAmount,
    };
  }
}
