import { Field, Float, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt, GraphQLDate } from 'graphql-scalars';

@ObjectType('BetPlaceResponse')
export class BetPlaceResponseDTO {
  @Field()
  gameId: string;

  @Field()
  roundId: string;

  @Field()
  betId: string;

  @Field()
  playerId: string;

  @Field(() => GraphQLBigInt)
  payout: number;

  @Field(() => GraphQLBigInt)
  payoutMultiplier: number;

  @Field(() => GraphQLBigInt)
  balance: number;

  @Field(() => GameCodes)
  gameCode: string;

  @Field()
  currency: string;

  @Field(() => GraphQLBigInt)
  betAmount: number;

  @Field()
  gameMode: string;

  @Field({ nullable: true })
  cashOutAt?: number;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  btnIndex?: number;

  @Field(() => Float, { nullable: true })
  targetMultiplier?: number;

  @Field(() => GraphQLDate, { nullable: true })
  createdAt?: Date;
}
