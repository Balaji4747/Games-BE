import { GameCodes } from '@provfair/shared/enums';

export interface InitInterface {
  token: string;
  gameCode: GameCodes;
}

export interface DebitInterface {
  token: string;
  playerId: string;
  amount: number;
  betId: string;
  gameCode: GameCodes;
  roundId?: string;
}

export interface CreditInterface {
  token: string;
  playerId: string;
  winAmount: number;
  betId: string;
  gameCode: GameCodes;
  clientSeed: string;
  serverSeed: string;
  hashedServerSeed: string;
  nonce: number;
  payoutMultiplier: number;
  roundId: string;
}
