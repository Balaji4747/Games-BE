import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('HiloCardOutcome')
export class HiloCardOutcomeDTO {
  @Field(() => Int)
  index: number;

  @Field()
  card: string;

  @Field(() => Int)
  rankValue: number;
}

@ObjectType('VerifyFairnessResponse')
export class VerifyFairnessResponseDTO {
  @Field(() => Float, { nullable: true })
  multiplier?: number;

  @Field(() => Float, { nullable: true })
  outcome?: number;

  @Field(() => [Int], { nullable: true })
  mines?: number[];

  @Field(() => [HiloCardOutcomeDTO], { nullable: true })
  cardOutcome?: HiloCardOutcomeDTO[];

  @Field(() => [String], { nullable: true })
  path?: string[];

  @Field(() => [String], { nullable: true })
  result?: string[];
}
