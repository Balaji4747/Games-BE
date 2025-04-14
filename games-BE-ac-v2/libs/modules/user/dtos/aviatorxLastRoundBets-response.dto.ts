import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('AviatorxLastRoundBets')
export class AviatorxLastRoundBetsDTO {
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
