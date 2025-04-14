import { Field, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('DiamondStateResponse')
class DiamondStateResponseDTO {
  @Field(() => [String])
  result: string[];
}

@ObjectType('DiamondBetPlaceResponse')
export class DiamondBetPlaceResponseDTO {
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

  @Field(() => DiamondStateResponseDTO)
  diamondState: DiamondStateResponseDTO;

  @Field()
  date: Date;
}
