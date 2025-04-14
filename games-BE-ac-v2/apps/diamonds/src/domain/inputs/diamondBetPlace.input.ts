import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsPositive, IsString } from 'class-validator';

@ArgsType()
export class DiamondBetPlaceInput {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;
}
