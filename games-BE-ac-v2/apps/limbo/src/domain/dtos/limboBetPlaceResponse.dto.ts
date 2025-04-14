import { Field, Float, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('LimboStateResponse')
class LimboStateResponseDTO {
  @Field(() => Float)
  outcome: number;

  @Field(() => Float)
  targetMultiplier: number;
}

@ObjectType('LimboBetPlaceResponse')
export class LimboBetPlaceResponseDTO {
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

  @Field(() => LimboStateResponseDTO)
  limboState: LimboStateResponseDTO;

  @Field()
  date: Date;
}
