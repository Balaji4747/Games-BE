import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MultiPlayerGameStates } from '@provfair/shared/enums';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType('CrashCurrentDayRoundResponse')
export class CrashCurrentDayRoundResponseDTO {
  @Field()
  gameId: string;

  @Field()
  roundId: string;

  @Field(() => MultiPlayerGameStates)
  status: MultiPlayerGameStates;

  @Field()
  crashMultiplier: number;

  @Field(() => Int)
  round: number;

  @Field(() => GraphQLDate)
  createdAt: Date;
}
