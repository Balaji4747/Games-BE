import { Field, Float, ObjectType } from '@nestjs/graphql';
import { GameCodes } from '@provfair/shared/enums';

@ObjectType('CancelBetResponse')
export class CancelBetResponseDTO {
  @Field()
  gameId: string;

  @Field()
  roundId: string;

  @Field()
  betId: string;

  @Field()
  playerId: string;

  @Field(() => Float)
  payout: number;

  @Field(() => Float)
  payoutMultiplier: number;

  @Field(() => GameCodes)
  gameCode: string;

  @Field()
  currency: string;

  @Field(() => Float)
  betAmount: number;

  @Field()
  gameMode: string;

  @Field({ nullable: true })
  cashOutAt?: number;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  btnIndex?: number;
}
