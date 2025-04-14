import { DiceGameConditions } from '@provfair/shared/enums';
import { IUserBet } from '@provfair/shared/interfaces/IUserBet';

export interface IDiceGameState {
  outcome: number;
  target: number;
  condition: DiceGameConditions;
  multiplier: number;
}

export type DiceUserBet = IUserBet<IDiceGameState>;
