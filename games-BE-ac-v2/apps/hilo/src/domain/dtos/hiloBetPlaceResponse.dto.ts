import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { GraphQLBigInt } from 'graphql-scalars';
import { CardRankEnum, CardSuitEnum, HiloGameConditions } from '../enums';
import { IHiloCard, IHiloGameState, IHiloRound } from '../interfaces/IHiloGameState';

@ObjectType('HiloCard')
export class HiloCardDTO implements IHiloCard {
  @Field(() => String)
  suit: CardSuitEnum;

  @Field(() => String)
  rank: CardRankEnum;
}

@ObjectType('HiloRound')
export class HiloRoundDTO implements IHiloRound {
  @Field(() => HiloCardDTO)
  card: HiloCardDTO;

  @Field(() => HiloGameConditions)
  guess: HiloGameConditions;

  @Field(() => Float)
  payoutMultiplier: number;
}

@ObjectType('HiloOutcome')
export class HiloOutcomeDTO {
  @Field(() => Int)
  index: number;

  @Field()
  card: string;

  @Field(() => Int)
  rankValue: number;
}

@ObjectType('HiloStateResponse')
export class HiloStateResponseDTO implements Omit<IHiloGameState, 'outcome'> {
  @Field(() => [HiloRoundDTO])
  rounds: HiloRoundDTO[];

  @Field(() => HiloCardDTO)
  startCard: HiloCardDTO;
}

@ObjectType('HiloBetPlaceResponse')
export class HiloBetPlaceResponseDTO {
  @Field()
  roundId: string;

  @Field()
  betId: string;

  @Field(() => GraphQLBigInt)
  payout: number;

  @Field(() => GraphQLBigInt)
  payoutMultiplier: number;

  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field(() => HiloStateResponseDTO)
  hiloState: HiloStateResponseDTO;

  @Field()
  date: Date;

  @Field(() => Float)
  betAmount: number;

  @Field()
  active: boolean;
}
