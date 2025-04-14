import { Field, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';

@ObjectType('UpdateUserAvatarResponse')
export class UpdateUserAvatarResponseDTO {
  @Field(() => GameCodes)
  gameCode: GameCodes;

  @Field()
  ok: boolean;
}
