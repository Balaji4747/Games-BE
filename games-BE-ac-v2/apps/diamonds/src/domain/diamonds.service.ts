import { Injectable } from '@nestjs/common';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { BetStatus, GameCodes } from '@provfair/shared/enums';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CommonService } from '@provfair/shared/services/common.service';
import { DIAMONDS_MATH } from '../math/diamonds';
import { DiamondBetPlaceResponseDTO } from './dtos/diamondBetPlaceResponse.dto';
import { DiamondBetPlaceInput } from './inputs/diamondBetPlace.input';

@Injectable()
export class DiamondsService extends CommonService {
  constructor(
    private readonly monitor: MonitoringService,
    private readonly userServiceInstance: UsersService,
    private readonly userBetService: UserBetService,
    private readonly rgsServiceInstance: RgsService,
    private readonly singlePlayerGameOutcomeService: SinglePlayerGameOutcomeService,
    private readonly socketIOEmitterService: SocketIOEmitterService,
  ) {
    super();
  }

  async betPlace(input: DiamondBetPlaceInput, currentUser: AuthUser): Promise<DiamondBetPlaceResponseDTO> {
    const { gameMode, operatorId, token, playerId } = currentUser;
    const { currency, betAmount } = input;

    this.monitor.info(`===Diamonds betPlace started ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetailsOrFail({ playerId: currentUser.playerId, operatorId });

    const [betId, roundId] = await Promise.all([this.generateUUid(), this.generateUUid()]);

    const userBetInfo: UserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      gameCode: GameCodes.DIAMONDS,
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
        gameCode: GameCodes.DIAMONDS,
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
      GameCodes.DIAMONDS,
    );

    const gemsCount = {}; // It will keep the count of number of occurrence of each type of gems

    const result: string[] = [];
    for (const curr of generatedTarget) {
      const gemType = Math.trunc(curr);
      gemsCount[gemType] = (gemsCount[gemType] || 0) + 1;
      result.push(DIAMONDS_MATH.colorMap[gemType]);
    }

    let payoutInfo;

    switch (Object.keys(gemsCount).length) {
      case 5: //All 5 different diamonds
        payoutInfo = DIAMONDS_MATH[gameMode].multiplierMap[6];
        break;
      case 1: // All 5 same diamonds
        payoutInfo = DIAMONDS_MATH[gameMode].multiplierMap[0];
        break;
      case 4: // 1 pair and 3 different diamonds
        payoutInfo = DIAMONDS_MATH[gameMode].multiplierMap[5];
        break;
      case 2: // [3 common and 2 common gems] OR [4 common and 1 different gems]
        payoutInfo = Object.keys(gemsCount)?.find((el) => gemsCount[el] === 4)
          ? DIAMONDS_MATH[gameMode].multiplierMap[1]
          : DIAMONDS_MATH[gameMode].multiplierMap[2];
        break;
      case 3: // [3 common and 2 different gems] OR [2 pair of common gems and 1 different gems]
        payoutInfo = Object.keys(gemsCount)?.find((el) => gemsCount[el] === 3)
          ? DIAMONDS_MATH[gameMode].multiplierMap[3]
          : DIAMONDS_MATH[gameMode].multiplierMap[4];
        break;
      default:
    }

    const payout = payoutInfo.multiplier * betAmount;
    const payoutMultiplier = payoutInfo.multiplier;

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });

    const state = {
      result,
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
          gameCode: GameCodes.DIAMONDS,
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
              `Error updating userBet to status CREDIT_SUCCESS for DIAMOND, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      })
      .catch((error) => {
        // TODO: Handle RGS error here, and if failed this can be retired

        this.monitor.error('Error on RGS credit call from DIAMOND betPlace', {
          error,
          data: { betId, roundId },
        });

        userBetRec
          .updateOne({ $set: { betStatus: BetStatus.CREDIT_FAILED, err: error, active: false } })
          .catch((e) =>
            this.monitor.error(
              `Error updating userBet to status CREDIT_FAILED for DIAMOND, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      });

    this.monitor.info(`===Diamonds betPlace ended with data ===`, { data: { input } });

    return {
      roundId,
      betId,
      payout,
      payoutMultiplier,
      diamondState: state,
      gameCode: GameCodes.DIAMONDS,
      date: userBetRec.createdAt,
    };
  }

  async payTable(currentUser: AuthUser) {
    const { gameMode } = currentUser;
    return DIAMONDS_MATH[gameMode].multiplierMap;
  }
}
