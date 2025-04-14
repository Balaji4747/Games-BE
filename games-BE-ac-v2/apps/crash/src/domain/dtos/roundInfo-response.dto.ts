import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType('CrashRoundInfoResponse')
export class CrashRoundInfoResponseDTO {
  @Field()
  roundId: string;

  @Field()
  seed: string;

  @Field()
  crashMultiplier: number;

  @Field()
  hash: string;

  @Field(() => Int)
  round: number;

  @Field(() => GraphQLDate)
  createdAt: Date;

  @Field()
  hex: string;

  @Field(() => Float)
  decimal: number;
}
