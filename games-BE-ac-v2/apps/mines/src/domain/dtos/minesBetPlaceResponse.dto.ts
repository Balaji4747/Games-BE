import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';
import { IMinesGameState, IMinesRound } from '../interfaces/IMinesGameState';

@ObjectType('MinesRound')
export class MinesRoundDTO implements IMinesRound {
  @Field(() => Int)
  field: number;

  @Field(() => Float)
  payoutMultiplier: number;
}

@ObjectType('MinesStateResponse')
export class MinesStateResponseDTO implements IMinesGameState {
  @Field(() => [MinesRoundDTO])
  rounds: MinesRoundDTO[];

  @Field(() => Int)
  mineCount: number;

  @Field(() => [Int], { nullable: true })
  mines?: number[];
}

@ObjectType('MinesBetPlaceResponse')
export class MinesBetPlaceResponseDTO {
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

  @Field(() => MinesStateResponseDTO)
  minesState: MinesStateResponseDTO;

  @Field()
  date: Date;

  @Field(() => Float)
  betAmount: number;
}
