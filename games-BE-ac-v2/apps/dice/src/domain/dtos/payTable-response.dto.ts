import { Field, Float, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('PayTableEntry')
export class PayTableEntryDTO {
  @Field(() => Float)
  multiplierOver: number;

  @Field(() => Float)
  multiplierUnder: number;

  @Field(() => GraphQLBigInt)
  outcome: number;

  @Field(() => GraphQLBigInt)
  probabilityOver: number;

  @Field(() => GraphQLBigInt)
  probabilityUnder: number;
}
