import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { IsEnum, IsOptional, IsPositive } from 'class-validator';
import { HydratedDocument, Model, Schema as MongooseSchema } from 'mongoose';

export type GameConfigDocument = HydratedDocument<GameConfig>;

@Schema({ timestamps: true, autoIndex: false, collection: 'game_configs' })
@ObjectType('GameConfig')
export class GameConfig {
  _id?: MongooseSchema.Types.ObjectId | string;

  @Prop({ type: String, required: true, enum: GameCodes })
  @Field(() => GameCodes)
  @IsEnum(GameCodes)
  gameCode: GameCodes;

  @Prop({ type: [String], required: true, enum: GameMode })
  @Field(() => [String])
  @IsEnum(GameMode, { each: true })
  activeGameModes: GameMode[];

  @Prop()
  @Field({ nullable: true })
  @IsPositive()
  @IsOptional()
  maxMultiplierCap?: number;

  @Prop()
  @Field({ nullable: true })
  @IsPositive()
  @IsOptional()
  acceptBetDelay?: number;
}

export const GameConfigSchema = SchemaFactory.createForClass(GameConfig);

export type GameConfigModel = Model<GameConfig>;
