import { ArgsType, Field } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums/gameCodes.enum';
import { IsEnum, IsString } from 'class-validator';

@ArgsType()
export class InitArgs {
  @Field()
  @IsString()
  readonly token: string;

  @Field()
  @IsString()
  readonly currency: string;

  @Field(() => GameCodes)
  @IsEnum(GameCodes)
  readonly gameCode: GameCodes;
}
