import { Field, InputType, Int } from '@nestjs/graphql';
import { PlinkoLevel } from '@provfair/apps/plinko/src/domain/enums/plinkoLevel.enum';
import { GameCodes } from '@provfair/shared/enums';
import { IsEnum, IsPositive, IsString, Min, ValidateIf } from 'class-validator';

@InputType()
export class VerifyFairnessInput {
  @Field(() => GameCodes)
  @IsEnum(GameCodes)
  gameCode: GameCodes;

  @Field({ nullable: true })
  @ValidateIf((o) => o.gameCode === GameCodes.SLIDE || o.gameCode === GameCodes.CRASH)
  @IsString()
  hash?: string;

  @Field({ nullable: true })
  @ValidateIf((o) => o.gameCode === GameCodes.SLIDE || o.gameCode === GameCodes.CRASH)
  @IsString()
  seed?: string;

  @Field({ nullable: true })
  serverSeed?: string;

  @Field({ nullable: true })
  clientSeed?: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @ValidateIf(
    (o) =>
      o.gameCode === GameCodes.MINES || o.gameCode === GameCodes.BOTTLESMASH || o.gameCode === GameCodes.OVERANDOUT,
  )
  @IsPositive()
  mineCount?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @ValidateIf((o) => o.gameCode !== GameCodes.SLIDE && o.gameCode !== GameCodes.CRASH)
  @Min(0)
  nonce?: number;

  @Field(() => Int, { nullable: true, defaultValue: 8 })
  @ValidateIf((o) => o.gameCode === GameCodes.PLINKO)
  @Min(8)
  rows?: number;

  @Field(() => PlinkoLevel, { nullable: true, defaultValue: PlinkoLevel.low })
  @ValidateIf((o) => o.gameCode === GameCodes.PLINKO)
  @IsEnum(PlinkoLevel)
  risk?: PlinkoLevel;
}
