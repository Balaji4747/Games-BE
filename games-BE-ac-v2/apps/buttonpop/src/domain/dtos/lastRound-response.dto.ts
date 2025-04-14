import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('ButtonPopLastRound')
export class ButtonPopLastRoundDTO {
  @Field()
  roundId: string;

  @Field(() => Float)
  crashMultiplier: number;
}
