import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { BetStatus, GameCodes, GameMode, MultiPlayerGameStates } from '@provfair/shared/enums';
import { IActiveGameCache } from '@provfair/shared/interfaces/IActiveGameCache';
import { GraphQLDate } from 'graphql-scalars';

@ObjectType('ActiveGameBet')
class ActiveGameBetDTO {
  @Field()
  betId: string;

  @Field()
  roundId: string;

  @Field(() => Float)
  betAmount: number;

  @Field()
  playerId: string;

  @Field(() => String)
  gameMode: GameMode;

  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field()
  currency: string;

  @Field(() => BetStatus)
  betStatus: BetStatus;

  @Field(() => Float, { nullable: true })
  payout: number;

  @Field(() => Float, { nullable: true })
  payoutMultiplier: number;

  @Field(() => Float, { nullable: true })
  cashOutAt?: number;

  @Field(() => Int, { nullable: true })
  btnIndex?: number;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => GraphQLDate)
  createdAt?: Date;
}

@ObjectType('ActiveGameResponse')
export class ActiveGameResponseDTO implements Omit<IActiveGameCache, 'finalCrashMultiplier'> {
  @Field()
  gameId: string;

  @Field()
  roundId: string;

  @Field(() => MultiPlayerGameStates)
  status: MultiPlayerGameStates;

  @Field(() => Float, { nullable: true })
  currentMultiplier?: number;

  @Field({ nullable: true })
  nextGameHashedSeed?: string;

  @Field(() => [ActiveGameBetDTO])
  bets: ActiveGameBetDTO[];

  @Field(() => String)
  gameMode: GameMode;

  @Field(() => [Float], { nullable: true })
  numbers?: number[];

  @Field(() => GraphQLDate, { nullable: true })
  startTime?: Date;

  @Field(() => Int, { nullable: true })
  gameEndIn?: number;

  @Field(() => Float, { nullable: true })
  delay?: number;

  @Field(() => Int, { nullable: true })
  acceptBetDelay?: number;
}
