import { Field, InputType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';
import { IsEnum } from 'class-validator';

@InputType()
export class ActiveGameInput {
  @Field(() => GameCodes)
  @IsEnum(GameCodes)
  gameCode: GameCodes;
}
