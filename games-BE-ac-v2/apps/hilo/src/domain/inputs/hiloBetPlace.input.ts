import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsEnum, IsPositive, IsString } from 'class-validator';
import { CardRankEnum, CardSuitEnum } from '../enums';

@ArgsType()
export class HiloBetPlaceInput {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;

  @Field(() => String)
  @IsEnum(CardSuitEnum)
  suit: CardSuitEnum;

  @Field(() => String)
  @IsEnum(CardRankEnum)
  rank: CardRankEnum;
}
