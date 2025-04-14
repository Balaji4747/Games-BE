import { Field, Float, InputType } from '@nestjs/graphql';
import { BetStatus } from '@provfair/shared/enums';
import { IsBoolean, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

@InputType()
export class BulkUpdateBetsInput {
  @Field({ defaultValue: false })
  @IsBoolean()
  active: boolean;

  @Field(() => GraphQLBigInt)
  @Min(0)
  payout: number;

  @Field(() => GraphQLBigInt)
  @Min(0)
  payoutMultiplier: number;

  @Field(() => BetStatus)
  @IsEnum(BetStatus)
  betStatus: BetStatus;

  @Field()
  @IsString()
  betId: string;

  @Field()
  @IsString()
  roundId: string;

  @Field(() => Float, { nullable: true })
  @Min(0)
  @IsOptional()
  crashMultiplier?: number;

  @Field({ nullable: true })
  hash?: string;

  @Field({ nullable: true })
  seed?: string;
}

@InputType()
export class BulkUpdateUserBetInput {
  @Field()
  @IsString()
  roundId: string;

  @Field(() => Float)
  @Min(0)
  finalCrashMultiplier: number;

  @Field({ nullable: true })
  hash?: string;

  @Field({ nullable: true })
  seed?: string;

  @Field(() => [BulkUpdateBetsInput], { nullable: true })
  bets: BulkUpdateBetsInput[];
}
