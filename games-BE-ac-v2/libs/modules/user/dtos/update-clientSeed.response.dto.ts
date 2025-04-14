import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('UpdateClientSeedResponse')
export class UpdateClientSeedResponseDTO {
  @Field()
  clientSeed: string;

  @Field()
  hashedServerSeed: string;

  @Field(() => GraphQLBigInt)
  nonce: number;

  @Field()
  hashedNextServerSeed: string;
}
