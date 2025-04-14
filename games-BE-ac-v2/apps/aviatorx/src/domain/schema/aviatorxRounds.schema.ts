import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GameMode } from '@provfair/shared/enums/gameModes.enum';
import { MultiPlayerGameStates } from '@provfair/shared/enums/multiPlayerGameStates.enum';
import { HydratedDocument, Model } from 'mongoose';

export type AviatorxRoundDocument = HydratedDocument<AviatorxRound>;

@Schema({ _id: false })
@ObjectType('FirstThreeBetters')
export class FirstThreeBetters {
  @Prop()
  @Field()
  betId: string;

  @Prop()
  @Field()
  clientSeed: string;

  @Prop()
  @Field()
  playerId: string;

  @Prop()
  @Field({ nullable: true })
  avatar?: string;
}

export const FirstThreeBettersSchema = SchemaFactory.createForClass(FirstThreeBetters);

@Schema({ timestamps: true, autoIndex: false, collection: 'aviatorx_rounds' })
export class AviatorxRound {
  @Prop({ required: true })
  roundId: string;

  @Prop({ type: String, required: true, enum: GameMode })
  gameMode: GameMode;

  @Prop({ type: String, enum: MultiPlayerGameStates, required: true })
  status: MultiPlayerGameStates;

  @Prop({ required: true })
  serverSeed: string;

  @Prop({ required: true })
  hashedServerSeed: string;

  @Prop()
  crashMultiplier: number;

  @Prop()
  hash: string;

  @Prop()
  round: number;

  @Prop({ index: true })
  createdAt?: Date;

  @Prop({ index: true })
  updatedAt?: Date;

  @Prop({ type: [FirstThreeBettersSchema] })
  firstThreeBetters: FirstThreeBetters[];
}

export const AviatorxRoundSchema = SchemaFactory.createForClass(AviatorxRound);

export type AviatorxRoundModel = Model<AviatorxRound>;
