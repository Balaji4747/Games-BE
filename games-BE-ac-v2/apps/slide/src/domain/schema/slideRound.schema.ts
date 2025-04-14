import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GameMode } from '@provfair/shared/enums/gameModes.enum';
import { MultiPlayerGameStates } from '@provfair/shared/enums/multiPlayerGameStates.enum';
import { HydratedDocument, Model } from 'mongoose';

export type SlideRoundDocument = HydratedDocument<SlideRound>;

@Schema({ timestamps: true, autoIndex: false, collection: 'slide_rounds' })
export class SlideRound {
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

  @Prop()
  numbers?: number[];

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const SlideRoundSchema = SchemaFactory.createForClass(SlideRound);

export type SlideRoundModel = Model<SlideRound>;
