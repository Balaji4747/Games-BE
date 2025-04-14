import { ArgsType, Field, Float, Int } from '@nestjs/graphql';
import { IsEnum, IsPositive, IsString } from 'class-validator';
import { PlinkoLevel } from '../enums/plinkoLevel.enum';

@ArgsType()
export class PlinkoBetPlaceInput {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;

  @Field(() => Int)
  @IsPositive()
  rows: number;

  @Field(() => PlinkoLevel)
  @IsEnum(PlinkoLevel)
  risk: PlinkoLevel;
}
