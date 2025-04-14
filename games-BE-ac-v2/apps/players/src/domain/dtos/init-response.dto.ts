import { Field, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';
import { GraphQLBigInt, GraphQLJWT } from 'graphql-scalars';
import { ErrorResponseDTO } from './error-response.dto';

@ObjectType('InitResponse')
export class InitResponseDTO {
  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field(() => GraphQLBigInt)
  balance: number;

  @Field(() => GraphQLJWT)
  beToken: string;

  @Field()
  operatorId: string;

  @Field()
  playerId: string;

  @Field()
  clientSeed: string;

  @Field()
  currency: string;

  @Field(() => GraphQLBigInt)
  defaultBet: number;

  @Field({ nullable: true })
  gameMode?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => GraphQLBigInt, { nullable: true })
  maxBet?: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  minBet?: number;

  @Field({ nullable: true })
  nextGameHashedSeed?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => ErrorResponseDTO, { nullable: true })
  error?: ErrorResponseDTO;
}
