import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('GetPlayerSeedsResponse')
export class GetPlayerSeedsResponseDTO {
  @Field()
  clientSeed: string;

  @Field()
  hashedServerSeed: string;

  @Field()
  hashedNextServerSeed: string;

  @Field(() => GraphQLBigInt)
  nonce: number;
}
