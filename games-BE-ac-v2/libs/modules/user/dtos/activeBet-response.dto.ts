import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { GraphQLDate, GraphQLJSON } from 'graphql-scalars';

@ObjectType('StateResponse')
export class StateResponseDTO {
  @Field(() => [GraphQLJSON], { nullable: true })
  rounds?: any[];

  @Field(() => GraphQLJSON, { nullable: true })
  startCard?: any;

  @Field(() => Int, { nullable: true })
  mineCount?: number;

  // @Field(() => [Float], { nullable: true })
  // mines?: number[];
}

@ObjectType('ActiveBetResponse')
export class ActiveBetResponseDTO {
  @Field()
  betId: string;

  @Field()
  roundId: string;

  @Field(() => String)
  gameMode: GameMode;

  @Field(() => Float)
  payout: number;

  @Field(() => Float)
  payoutMultiplier: number;

  @Field(() => Float)
  betAmount: number;

  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field()
  active: boolean;

  @Field(() => GraphQLDate, { nullable: true })
  createdAt?: Date;

  @Field(() => StateResponseDTO, { nullable: true })
  state?: StateResponseDTO;
}
