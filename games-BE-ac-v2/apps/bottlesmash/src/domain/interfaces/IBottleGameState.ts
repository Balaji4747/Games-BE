import { IUserBet } from '@provfair/shared/interfaces/IUserBet';

export interface IBottleSmashGameState {
  rounds: IBottleSmashRound[];

  mineCount: number;

  mines?: number[];
}

export interface IBottleSmashRound {
  field: number;

  payoutMultiplier: number;
}

export type BottleSmashUserBet = IUserBet<IBottleSmashGameState>;
