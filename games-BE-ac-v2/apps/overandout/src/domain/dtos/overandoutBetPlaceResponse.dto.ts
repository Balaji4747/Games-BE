import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';
import { IOverAndOutGameState, IOverAndOutRound } from '../interfaces/IOverAndOutGameState';

@ObjectType('OverAndOutRound')
export class OverAndOutRoundDTO implements IOverAndOutRound {
  @Field(() => Int)
  field: number;

  @Field(() => Float)
  payoutMultiplier: number;
}

@ObjectType('OverAndOutStateResponse')
export class OverAndOutStateResponseDTO implements IOverAndOutGameState {
  @Field(() => [OverAndOutRoundDTO])
  rounds: OverAndOutRoundDTO[];

  @Field(() => Int)
  mineCount: number;

  @Field(() => [Int], { nullable: true })
  mines?: number[];
}

@ObjectType('OverAndOutBetPlaceResponse')
export class OverAndOutBetPlaceResponseDTO {
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

  @Field(() => OverAndOutStateResponseDTO)
  minesState: OverAndOutStateResponseDTO;

  @Field()
  date: Date;

  @Field(() => Float)
  betAmount: number;
}
