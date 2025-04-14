import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('AviatorxLastRound')
export class AviatorxLastRoundDTO {
  @Field()
  roundId: string;

  @Field(() => Float)
  crashMultiplier: number;
}
