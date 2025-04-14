import { ArgsType, Field, Float, Int, PickType } from '@nestjs/graphql';
import { IsPositive, IsString, Max, Min } from 'class-validator';

@ArgsType()
export class MinesBetPlaceInput {
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
export class MinesAutoBetPlaceInput extends PickType(
  MinesBetPlaceInput,
  ['currency', 'betAmount', 'mineCount'],
  ArgsType,
) {
  @Field(() => [Int])
  @Min(0, { each: true })
  positions: number[];
}
