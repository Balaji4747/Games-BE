import { Field, Float, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType('UserBetsResponse')
export class UserBetsResponseDTO {
  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field()
  playerId: string;

  @Field(() => Float)
  betAmount: number;

  @Field()
  currency: string;

  @Field(() => Float)
  payout: number;

  @Field(() => Float)
  payoutMultiplier: number;

  @Field(() => Float, { nullable: true })
  crashMultiplier?: number;

  @Field()
  betId: string;

  @Field(() => GraphQLDate)
  createdAt: Date;
}
