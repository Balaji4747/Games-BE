import { IUserBet } from '@provfair/shared/interfaces/IUserBet';

export interface IOverAndOutGameState {
  rounds: IOverAndOutRound[];

  mineCount: number;

  mines?: number[];
}

export interface IOverAndOutRound {
  field: number;

  payoutMultiplier: number;
}

export type OverAndOutUserBet = IUserBet<IOverAndOutGameState>;
