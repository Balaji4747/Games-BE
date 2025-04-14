import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';
import { PlinkoLevel } from '../enums/plinkoLevel.enum';

@ObjectType('PlinkoStateResponse')
class PlinkoStateResponseDTO {
  @Field(() => [String])
  path: string[];

  @Field(() => PlinkoLevel)
  risk: PlinkoLevel;

  @Field(() => Int)
  rows: number;
}

@ObjectType('PlinkoBetPlaceResponse')
export class PlinkoBetPlaceResponseDTO {
  @Field()
  roundId: string;

  @Field()
  betId: string;

  @Field(() => GraphQLBigInt)
  payout: number;

  @Field(() => GraphQLBigInt)
  payoutMultiplier: number;

  @Field(() => GameCodes)
  gameCode: string;

  @Field(() => PlinkoStateResponseDTO)
  plinkoState: PlinkoStateResponseDTO;

  @Field()
  date: Date;
}
