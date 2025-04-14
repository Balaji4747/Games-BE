import { BetStatus, GameCodes, GameMode } from '@provfair/shared/enums';
import { Schema as MongooseSchema } from 'mongoose';

export interface IUserBet<StateType = Record<string, unknown>> {
  _id?: MongooseSchema.Types.ObjectId | string;

  userId: MongooseSchema.Types.ObjectId | string;

  playerId: string;

  operatorId: string;

  token: string;

  balance: number;

  clientSeed: string;

  serverSeed: string;

  hashedServerSeed: string;

  nonce: number;

  gameCode: GameCodes;

  gameMode: GameMode;

  currency: string;

  betAmount: number;

  payout: number;

  payoutMultiplier: number;

  gameId?: string;

  betStatus: BetStatus;

  err?: string;

  active: boolean;

  betId: string;

  cashOutAt?: number;

  btnIndex?: number;

  roundId: string;

  targetMultiplier?: number;

  avatar?: string;

  crashMultiplier?: number;

  state?: StateType;

  createdAt?: Date;

  updatedAt?: Date;
}
