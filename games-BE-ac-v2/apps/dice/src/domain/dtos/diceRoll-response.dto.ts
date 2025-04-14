import { Field, Float, ObjectType } from '@nestjs/graphql';
import { DiceGameConditions, GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';
import { IDiceGameState } from '../interfaces/IDiceGameState';

@ObjectType('DiceStateResponse')
class DiceStateResponseDTO implements IDiceGameState {
  @Field(() => Float)
  outcome: number;

  @Field(() => Float)
  target: number;

  @Field(() => DiceGameConditions)
  condition: DiceGameConditions;

  @Field(() => Float)
  multiplier: number;
}

@ObjectType('DiceRollResponse')
export class DiceRollResponseDTO {
  @Field()
  roundId: string;

  @Field()
  betId: string;

  @Field(() => GraphQLBigInt)
  payout: number;

  @Field(() => GraphQLBigInt)
  payoutMultiplier: number;

  @Field(() => GameCodes)
  gameCode: string;

  @Field(() => DiceStateResponseDTO)
  diceState: DiceStateResponseDTO;

  @Field()
  date: Date;
}
