import { Injectable } from '@nestjs/common';
import { SinglePlayerGameOutcomeService } from '@provfair/modules/provablyFair/services';
import RgsService from '@provfair/modules/rgs/rgs.service';
import { SocketIOEmitterService } from '@provfair/modules/socketEmitter/socketEmitter.service';
import { UserBetService } from '@provfair/modules/user/services/userBet.service';
import { UsersService } from '@provfair/modules/user/services/users.service';
import { MonitoringService } from '@provfair/monitoring';
import { BetStatus, DiceGameConditions, GameCodes } from '@provfair/shared/enums';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { CommonService } from '@provfair/shared/services/common.service';
import gameConfig from '../math/dice';
import { DiceRollResponseDTO } from './dtos/diceRoll-response.dto';
import { PayTableEntryDTO } from './dtos/payTable-response.dto';
import { DiceRollInput } from './inputs/diceRoll.input';
import { DiceUserBet, IDiceGameState } from './interfaces/IDiceGameState';

@Injectable()
export class DiceService extends CommonService {
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

  async roll(input: DiceRollInput, currentUser: AuthUser): Promise<DiceRollResponseDTO> {
    const { gameMode, operatorId, token, playerId } = currentUser;
    const { currency, betAmount, target, condition } = input;

    this.monitor.info(`===Dice betPlace started ===`, { data: { input } });

    let user = await this.userServiceInstance.getUserDetailsOrFail({ playerId, operatorId });
    const [betId, roundId] = await Promise.all([this.generateUUid(), this.generateUUid()]);

    // Initialize user bet info
    const userBetInfo: DiceUserBet = {
      userId: user._id,
      playerId,
      operatorId,
      token,
      gameCode: GameCodes.DICE,
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
      // Debit the bet amount
      const { balance } = await this.rgsServiceInstance.debit({
        token,
        playerId,
        amount: betAmount,
        betId,
        roundId,
        gameCode: GameCodes.DICE,
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

    // Generate game outcome
    const generatedTarget = await this.singlePlayerGameOutcomeService.generateGameOutcomes(
      user.serverSeed,
      user.clientSeed,
      user.nonce,
      GameCodes.DICE,
    );
    const outcome = Math.trunc(generatedTarget[0]) / 100;
    const payoutInfo = gameConfig[gameMode].multiplierMap.find((el) => el.outcome === target);

    // Determine payout and multiplier based on the condition
    const isWinningCondition =
      (condition === DiceGameConditions.ABOVE && outcome > target) ||
      (condition === DiceGameConditions.BELOW && outcome <= target);

    const multiplier = condition === DiceGameConditions.ABOVE ? payoutInfo.multiplierOver : payoutInfo.multiplierUnder;

    let payoutMultiplier = 0;
    let payout = 0;

    if (isWinningCondition) {
      payout = betAmount * multiplier;
      payoutMultiplier = multiplier;
    }

    const state: IDiceGameState = { outcome, target, condition, multiplier };

    // Update user nonce
    user = await this.userServiceInstance.updateUserDetails(user._id.toString(), { $inc: { nonce: 1 } });

    // Update bet record with the calculated data
    Object.assign(userBetRec, {
      state,
      nonce: user.nonce,
      winChance: condition === DiceGameConditions.ABOVE ? payoutInfo.probabilityOver : payoutInfo.probabilityUnder,
      betStatus: BetStatus.CREDIT_STARTED,
      payout,
      payoutMultiplier,
      active: false,
    });
    await userBetRec.save();

    // Process credit
    try {
      const resp = await this.rgsServiceInstance.credit([
        {
          token,
          playerId,
          winAmount: payout,
          betId,
          roundId,
          gameCode: GameCodes.DICE,
          clientSeed: user.clientSeed,
          serverSeed: user.serverSeed,
          hashedServerSeed: user.hashedServerSeed,
          nonce: user.nonce,
          payoutMultiplier,
        },
      ]);

      const rgsData = resp?.find((r) => r.transaction_id === betId);

      if (rgsData) {
        this.userBetService
          .updateBet(betId, {
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
              `Error updating userBet to status CREDIT_SUCCESS for mines, roundId: ${roundId}, betId: ${betId}`,
              { error: e },
            ),
          );
      } else {
        this.monitor.error('Bet data not found in RGS credit response.', { data: { betId } });
        throw new Error('Credit failed. Will be retired again.');
      }
    } catch (error) {
      userBetRec
        .updateOne({ $set: { betStatus: BetStatus.CREDIT_FAILED, err: error, active: false } })
        .catch((e) =>
          this.monitor.error(
            `Error updating userBet to status CREDIT_FAILED for dice, roundId: ${roundId}, betId: ${betId}`,
            { error: e },
          ),
        );

      throw error;
    }

    // Finalize bet record
    await userBetRec.updateOne({ $set: { active: false, betStatus: BetStatus.CREDIT_SUCCESS } });

    this.monitor.info(`===Dice betPlace ended with data ===`, { data: { input } });

    return {
      roundId,
      betId,
      payout,
      payoutMultiplier,
      diceState: state,
      gameCode: GameCodes.DICE,
      date: userBetRec.createdAt,
    };
  }

  async payTable(currentUser: AuthUser): Promise<PayTableEntryDTO[]> {
    const { gameMode } = currentUser;
    return gameConfig[gameMode].multiplierMap;
  }
}
