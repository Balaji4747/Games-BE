import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BetStatus, GameCodes, GameMode } from '@provfair/shared/enums';
import { IUserBet } from '@provfair/shared/interfaces/IUserBet';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';
import { Users } from './users.schema';

export type UserBetDocument = HydratedDocument<UserBet>;

@Schema({ timestamps: true, autoIndex: false, collection: 'user_bets' })
export class UserBet implements IUserBet {
  _id?: MongooseSchema.Types.ObjectId | string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Users.name, required: true })
  userId: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  playerId: string;

  @Prop({ required: true })
  operatorId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: true })
  clientSeed: string;

  @Prop({ required: true })
  serverSeed: string;

  @Prop({ required: true })
  hashedServerSeed: string;

  @Prop({ required: true, default: 0 })
  nonce: number;

  @Prop({ type: String, enum: GameCodes, required: true })
  gameCode: GameCodes;

  @Prop({ type: String, enum: GameMode, required: true })
  gameMode: GameMode;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  betAmount: number;

  @Prop()
  payout: number;

  @Prop()
  payoutMultiplier: number;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  gameId?: string;

  @Prop({ type: String, enum: BetStatus, required: true })
  betStatus: BetStatus;

  @Prop({ type: MongooseSchema.Types.Mixed })
  err?: any;

  @Prop()
  active: boolean;

  @Prop({ required: true })
  betId: string;

  @Prop({ nullable: true })
  cashOutAt?: number;

  @Prop({ nullable: true })
  btnIndex?: number;

  @Prop({ required: true })
  roundId: string;

  @Prop()
  targetMultiplier?: number;

  @Prop()
  avatar?: string;

  @Prop()
  crashMultiplier?: number;

  @Prop()
  winChance?: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  state?: any;

  @Prop()
  reason?: string;

  @Prop()
  seed?: string;

  @Prop()
  hash?: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const UserBetSchema = SchemaFactory.createForClass(UserBet);

export type UserBetModel = Model<UserBet>;
