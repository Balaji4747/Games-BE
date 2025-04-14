import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('LastRoundBets')
export class LastRoundBetsDTO {
  @Field()
  playerId: string;

  @Field()
  betId: string;

  @Field(() => Float)
  payout: number;

  @Field(() => Float)
  payoutMultiplier: number;

  @Field(() => Float)
  betAmount: number;

  @Field({ nullable: true })
  avatar?: string;
}
