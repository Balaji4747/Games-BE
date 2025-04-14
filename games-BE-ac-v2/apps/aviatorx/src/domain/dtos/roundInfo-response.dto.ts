import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-scalars';
import { FirstThreeBetters } from '../schema/aviatorxRounds.schema';

@ObjectType('AviatorxRoundInfoResponse')
export class AviatorxRoundInfoResponseDTO {
  @Field()
  roundId: string;

  @Field()
  serverSeed: string;

  @Field()
  crashMultiplier: number;

  @Field()
  hash: string;

  @Field(() => Int)
  round: number;

  @Field(() => GraphQLDate)
  createdAt: Date;

  @Field(() => [FirstThreeBetters], { nullable: true })
  firstThreeBetters?: FirstThreeBetters[];

  @Field()
  hex: string;

  @Field(() => Float)
  decimal: number;
}
