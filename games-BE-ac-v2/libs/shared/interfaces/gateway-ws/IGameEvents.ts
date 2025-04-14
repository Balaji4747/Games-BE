import { GameCodes } from '@provfair/shared/enums';

export interface IBetPlaceInput {
  token: string;
  gameCode: GameCodes;
  currency: string;
  betAmount: number;
  btnIndex: number;
}

export interface ICashOutInput {
  token: string;
  gameCode: GameCodes;
  betId: string;
}
