import { IUserBet } from '@provfair/shared/interfaces/IUserBet';

export interface IMinesGameState {
  rounds: IMinesRound[];

  mineCount: number;

  mines?: number[];
}

export interface IMinesRound {
  field: number;

  payoutMultiplier: number;
}

export type MinesUserBet = IUserBet<IMinesGameState>;
