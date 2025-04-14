import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsPositive, IsString, Min } from 'class-validator';

@ArgsType()
export class LimboBetPlaceInput {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;

  @Field(() => Float)
  @Min(1.1)
  targetMultiplier: number;
}
