import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';
import { IBottleSmashGameState, IBottleSmashRound } from '../interfaces/IBottleGameState';

@ObjectType('BottleSmashRound')
export class BottleSmashRoundDTO implements IBottleSmashRound {
  @Field(() => Int)
  field: number;

  @Field(() => Float)
  payoutMultiplier: number;
}

@ObjectType('BottleSmashStateResponse')
export class BottleSmashStateResponseDTO implements IBottleSmashGameState {
  @Field(() => [BottleSmashRoundDTO])
  rounds: BottleSmashRoundDTO[];

  @Field(() => Int)
  mineCount: number;

  @Field(() => [Int], { nullable: true })
  mines?: number[];
}

@ObjectType('BottleSmashBetPlaceResponse')
export class BottleSmashBetPlaceResponseDTO {
  @Field()
  roundId: string;

  @Field()
  betId: string;

  @Field(() => GraphQLBigInt)
  payout: number;

  @Field(() => GraphQLBigInt)
  payoutMultiplier: number;

  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field(() => BottleSmashStateResponseDTO)
  minesState: BottleSmashStateResponseDTO;

  @Field()
  date: Date;

  @Field(() => Float)
  betAmount: number;
}
