import { Field, InputType } from '@nestjs/graphql';
import { OffsetLimitArgs } from '@provfair/modules/graphql/inputs/offset-limit.args';
import { GameCodes } from '@provfair/shared/enums';
import { UserBetType } from '@provfair/shared/enums/userBets.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

@InputType()
export class UserBetsInput extends OffsetLimitArgs {
  @Field(() => GameCodes, { nullable: true })
  @IsEnum(GameCodes)
  @IsOptional()
  gameCode?: GameCodes;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  roundId?: string;

  @Field(() => UserBetType, { nullable: true, defaultValue: UserBetType.MY })
  @IsEnum(UserBetType)
  type?: UserBetType;
}
