import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GameMode } from '@provfair/shared/enums/gameModes.enum';
import { MultiPlayerGameStates } from '@provfair/shared/enums/multiPlayerGameStates.enum';
import { Model } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false, collection: 'pcrash_rounds' })
export class PCrashRound {
  @Prop({ required: true })
  roundId: string;

  @Prop({ type: String, required: true, enum: GameMode })
  gameMode: GameMode;

  @Prop({ type: String, enum: MultiPlayerGameStates, required: true })
  status: MultiPlayerGameStates;

  @Prop()
  crashMultiplier: number;

  @Prop()
  hash: string;

  @Prop()
  seed: string;

  @Prop()
  round: number;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const PCrashRoundSchema = SchemaFactory.createForClass(PCrashRound);

export type PCrashRoundModel = Model<PCrashRound>;
