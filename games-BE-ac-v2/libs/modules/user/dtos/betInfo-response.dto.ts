import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { PlinkoLevel } from '@provfair/apps/plinko/src/domain/enums/plinkoLevel.enum';
import { DiceGameConditions, GameCodes, GameMode } from '@provfair/shared/enums';
import { GraphQLBigInt, GraphQLDate, GraphQLJSON } from 'graphql-scalars';

@ObjectType('BetInfoStateResponse')
export class BetInfoStateResponseDTO {
  @Field(() => [GraphQLJSON], { nullable: true })
  rounds?: any[];

  @Field(() => GraphQLJSON, { nullable: true })
  startCard?: any;

  @Field(() => Int, { nullable: true })
  mineCount?: number;

  @Field(() => Int, { nullable: true })
  target?: number;

  @Field(() => DiceGameConditions, { nullable: true })
  condition?: DiceGameConditions;

  @Field(() => Float, { nullable: true })
  outcome?: number;

  @Field(() => [Float], { nullable: true })
  mines?: number[];

  @Field(() => Float, { nullable: true, description: 'This is used in Limbo' })
  targetMultiplier?: number;

  @Field(() => [String], { nullable: true })
  path?: string[];

  @Field(() => Int, { nullable: true })
  rows?: number;

  @Field(() => PlinkoLevel, { nullable: true })
  risk?: PlinkoLevel;

  @Field(() => Float, { nullable: true, description: 'The outcome multiplier for Dice' })
  multiplier?: number;
}

@ObjectType('BetInfoResponse')
export class BetInfoResponseDTO {
  @Field()
  betId: string;

  @Field()
  roundId: string;

  @Field()
  playerId: string;

  @Field(() => String)
  gameMode: GameMode;

  @Field(() => Float)
  payout: number;

  @Field(() => Float)
  payoutMultiplier: number;

  @Field(() => Float)
  betAmount: number;

  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field(() => GraphQLDate, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLBigInt)
  nonce: number;

  @Field()
  currency: string;

  @Field(() => BetInfoStateResponseDTO, { nullable: true })
  state?: BetInfoStateResponseDTO;

  @Field(() => Float, { nullable: true })
  cashOutAt?: number;

  @Field(() => Int, { nullable: true })
  btnIndex?: number;

  @Field(() => Int, { nullable: true })
  winChance?: number;

  @Field(() => Float, { nullable: true, description: 'This is used only for Slide' })
  targetMultiplier?: number;

  @Field(() => Float, { nullable: true })
  crashMultiplier?: number;

  @Field({ nullable: true })
  hash?: string;

  @Field({ nullable: true })
  seed?: string;

  @Field({ nullable: true })
  serverSeed?: string;

  @Field({ nullable: true })
  clientSeed?: string;

  @Field({ nullable: true })
  hashedServerSeed?: string;

  @Field({ nullable: true })
  active?: boolean;
}
