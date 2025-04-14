import { Injectable } from '@nestjs/common';
import { UserBet } from '@provfair/modules/user/schema/userBet.schema';
import { BetPlaceResponseDTO } from '@provfair/shared/dtos';
import { BetStatus } from '@provfair/shared/enums';

@Injectable()
export class ResponseBuilderService {
  buildBetPlaceWSResp(bet: UserBet) {
    const {
      betId,
      betAmount,
      roundId,
      playerId,
      gameCode,
      gameMode,
      currency,
      cashOutAt,
      btnIndex,
      avatar,
      targetMultiplier,
      createdAt,
    } = bet;

    return {
      betId,
      betAmount,
      roundId,
      playerId,
      gameMode,
      gameCode,
      currency,
      cashOutAt,
      btnIndex,
      avatar,
      status: BetStatus.BET_PLACED,
      success: true,
      targetMultiplier,
      createdAt,
    };
  }

  buildBetPlaceResp(bet: UserBet): BetPlaceResponseDTO {
    const {
      betId,
      betAmount,
      roundId,
      playerId,
      gameCode,
      gameMode,
      balance,
      currency,
      gameId,
      payout,
      payoutMultiplier,
      cashOutAt,
      avatar,
      btnIndex,
      targetMultiplier,
      createdAt,
    } = bet;

    return {
      gameId: gameId.toString(),
      roundId,
      betId,
      playerId,
      payout,
      payoutMultiplier,
      balance,
      gameCode,
      currency,
      betAmount,
      gameMode,
      cashOutAt,
      avatar,
      btnIndex,
      targetMultiplier,
      createdAt,
    };
  }

  cashOutWsResp(bet: UserBet) {
    const {
      roundId,
      betAmount,
      betId,
      playerId,
      gameCode,
      gameMode,
      currency,
      payout,
      payoutMultiplier,
      cashOutAt,
      btnIndex,
      avatar,
      createdAt,
    } = bet;

    return {
      roundId,
      betId,
      playerId,
      gameCode,
      gameMode,
      betAmount,
      currency,
      payout,
      payoutMultiplier,
      cashOutAt,
      btnIndex,
      status: BetStatus.CASHED_OUT,
      avatar,
      success: true,
      createdAt,
    };
  }

  cancelBetWsResp(bet: UserBet) {
    const { roundId, betId, playerId, gameCode, gameMode, btnIndex, avatar } = bet;

    return {
      roundId,
      betId,
      playerId,
      gameCode,
      gameMode,
      btnIndex,
      status: BetStatus.BET_CANCELLED,
      avatar,
      success: true,
    };
  }
}
