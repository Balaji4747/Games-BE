import { Field, InputType } from '@nestjs/graphql';
import { GameCodes, GameMode } from '@provfair/shared/enums';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class CashOutInput {
  @Field(() => GameCodes, { nullable: true })
  @IsEnum(GameCodes)
  @IsOptional()
  gameCode?: GameCodes;

  @Field()
  @IsString()
  betId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  gameId?: string;

  token: string;

  playerId: string;

  operatorId: string;

  gameMode: GameMode;

  cashOutAt?: number;
}
