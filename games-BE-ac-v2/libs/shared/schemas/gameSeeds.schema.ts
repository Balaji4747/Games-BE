import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';
import { GameCodes } from '../enums';

export type GameSeedsDocument = HydratedDocument<GameSeeds>;

@Schema({ timestamps: true, autoIndex: false, collection: 'game_seeds' })
export class GameSeeds {
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  seed: string;

  @Prop({ type: String, required: true, enum: GameCodes })
  gameCode: GameCodes;

  @Prop({ required: true, default: 0 })
  bitcoinBlocknumber: number;

  @Prop()
  proof: string;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;
}

export const GameSeedsSchema = SchemaFactory.createForClass(GameSeeds);

export type GameSeedsModel = Model<GameSeeds>;
