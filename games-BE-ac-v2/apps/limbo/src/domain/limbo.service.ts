import { Injectable } from '@nestjs/common';
import { GameConfig } from '@provfair/apps/management/src/app/schemas/gameConfig.schema';
import { CacheService } from '@provfair/modules/cache/cache.service';
import { LocalCacheService } from '@provfair/modules/local-cache/localCache.service';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { BetStatus, GameCodes, RedisCacheKeyEnum } from '@provfair/shared/enums';
import { getRedisCacheKeys } from '@provfair/shared/helpers/getRedisCacheKeys';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CommonService } from '@provfair/shared/services/common.service';
import { LimboBetPlaceResponseDTO } from './dtos/limboBetPlaceResponse.dto';
import { LimboBetPlaceInput } from './inputs/limboBetPlace.input';

@Injectable()
export class LimboService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly userServiceInstance: UsersService,
    private readonly userBetService: UserBetService,
    private readonly rgsServiceInstance: RgsService,
    private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
    private readonly cacheService: CacheService,
    private readonly localCacheService: LocalCacheService,
  ) {
    super();
  }

  private async getMaxMultiplier() {
    const limboMaxMultiplier: number = await this.localCacheService.getCache(`${GameCodes.LIMBO}/maxMultiplier`);

    if (limboMaxMultiplier) {
      this.monitor.debug('limbo max multiplier cap found in local cache.');
      return limboMaxMultiplier;
    }

    const gameConfig: GameConfig = await this.cacheService.getElementFromSet({
      key: getRedisCacheKeys(RedisCacheKeyEnum.GAME_CONFIG, null),
      field: GameCodes.LIMBO,
    });

    if (gameConfig) {
      this.monitor.debug('limbo max multiplier cap found in redis cache.');

      await this.localCacheService.setCache({
        key: `${GameCodes.LIMBO}/maxMultiplier`,
        data: gameConfig.maxMultiplierCap,
        expire: 3600,
      });

      return gameConfig.maxMultiplierCap;
    }

    this.monitor.debug('limbo max multiplier cap not found in any cache, sending default one.');

    return 500;
  }

  async betPlace(input: LimboBetPlaceInput, currentUser: AuthUser): Promise<LimboBetPlaceResponseDTO> {
    const { gameMode, operatorId, token, playerId } = currentUser;
    const { currency, betAmount, targetMultiplier } = input;

    this.monitor.info(`===Limbo betPlace started ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetailsOrFail({ playerId: currentUser.playerId, operatorId });

    const [betId, roundId] = await Promise.all([this.generateUUid(), this.generateUUid()]);

    const userBetInfo: UserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      gameCode: GameCodes.LIMBO,
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
        gameCode: GameCodes.LIMBO,
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
      GameCodes.LIMBO,
      gameMode,
    );

    const maxMultiplier = await this.getMaxMultiplier();

    let outcome = Math.trunc(generatedTarget[0] * 100) / 100;
    outcome = outcome < 1 ? 1 : outcome > maxMultiplier ? maxMultiplier : outcome;

    const isWinningBet = targetMultiplier <= outcome;
    const payout = isWinningBet ? targetMultiplier * betAmount : 0;
    const payoutMultiplier = isWinningBet ? targetMultiplier : 0;

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });

    const state = {
      targetMultiplier: targetMultiplier,
      outcome,
    };

    userBetRec.state = state;
    userBetRec.nonce = user.nonce;
    userBetRec.betStatus = BetStatus.CREDIT_STARTED;
    userBetRec.payout = payout;
    userBetRec.payoutMultiplier = payoutMultiplier;
    userBetRec.active = false;
    await userBetRec.save();

    this.rgsServiceInstance
      .credit([
        {
          token,
          playerId,
          winAmount: payout,
          betId,
          roundId,
          gameCode: GameCodes.LIMBO,
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
              `Error updating userBet to status CREDIT_SUCCESS for limbo, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      })
      .catch((error) => {
        // TODO: Handle RGS error here, and if failed this can be retired

        this.monitor.error('Error on RGS credit call from limbo betPlace', {
          error,
          data: { betId, roundId },
        });

        userBetRec
          .updateOne({ $set: { betStatus: BetStatus.CREDIT_FAILED, err: error, active: false } })
          .catch((e) =>
            this.monitor.error(
              `Error updating userBet to status CREDIT_FAILED for limbo, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      });

    this.monitor.info(`===Limbo betPlace ended with data ===`, { data: { input } });

    return {
      roundId,
      betId,
      payout,
      payoutMultiplier,
      limboState: state,
      gameCode: GameCodes.LIMBO,
      date: userBetRec.createdAt,
    };
  }
}
