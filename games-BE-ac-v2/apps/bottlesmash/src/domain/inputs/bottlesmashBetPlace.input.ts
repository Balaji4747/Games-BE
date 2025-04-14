import { ArgsType, Field, Float, Int, PickType } from '@nestjs/graphql';
import { IsPositive, IsString, Max, Min } from 'class-validator';

@ArgsType()
export class BottleSmashBetPlaceInput {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;

  @Field(() => Int)
  @IsPositive()
  @Max(24)
  mineCount: number;
}

@ArgsType()
export class BottleSmashAutoBetPlaceInput extends PickType(
  BottleSmashBetPlaceInput,
  ['currency', 'betAmount', 'mineCount'],
  ArgsType,
) {
  @Field(() => [Int])
  @Min(0, { each: true })
  positions: number[];
}
