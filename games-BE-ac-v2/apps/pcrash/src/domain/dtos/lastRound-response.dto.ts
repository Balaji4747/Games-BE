import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('PCrashLastRound')
export class PCrashLastRoundDTO {
  @Field()
  roundId: string;

  @Field(() => Float)
  crashMultiplier: number;
}
