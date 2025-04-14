import { IUserBet } from '@provfair/shared/interfaces/IUserBet';
import { CardRankEnum, CardSuitEnum, HiloGameConditions } from '../enums';

export interface IHiloGameState {
  rounds: IHiloRound[];

  startCard: IHiloCard;

  outcome: IHiloOutcome;
}

export interface IHiloCard {
  suit: CardSuitEnum;

  rank: CardRankEnum;
}

export interface IHiloRound {
  card: IHiloCard;

  guess: HiloGameConditions;

  payoutMultiplier: number;
}

export class IHiloOutcome {
  index: number;

  card: string;

  rankValue: number;
}

export type HiloUserBet = IUserBet<IHiloGameState>;
