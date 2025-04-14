import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { GameCodes, GameMode, MultiplayerGameCodes } from '@provfair/shared/enums';
import { IsEnum, IsOptional, IsPositive, IsString, Min, ValidateIf } from 'class-validator';
import { GraphQLBigInt } from 'graphql-scalars';

@InputType()
export class BetPlaceInput {
  @Field(() => GameCodes, { nullable: true })
  @IsEnum(MultiplayerGameCodes)
  gameCode?: GameCodes;

  @Field()
  @IsString()
  currency: string;

  @Field(() => Float)
  @IsPositive()
  betAmount: number;

  @Field(() => Int, { nullable: true })
  @Min(0)
  btnIndex?: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  @Min(0)
  @IsOptional()
  cashOutAt?: number;

  @Field(() => Float, { nullable: true })
  @ValidateIf((o) => o.gameCode === GameCodes.SLIDE)
  @Min(1.1)
  targetMultiplier?: number;

  // Below will not be part of GQL input, this will be added to the class upon auth
  token: string;

  playerId: string;

  operatorId: string;

  gameMode: GameMode;
}
