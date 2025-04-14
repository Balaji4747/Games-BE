import { ArgsType, Field, Float } from '@nestjs/graphql';
import { DiceGameConditions } from '@provfair/shared/enums';
import { IsEnum, IsPositive, IsString } from 'class-validator';

@ArgsType()
export class DiceRollInput {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;

  @Field(() => Float)
  @IsPositive()
  target: number;

  @Field(() => DiceGameConditions)
  @IsEnum(DiceGameConditions)
  condition: DiceGameConditions;
}
