import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

export const DEFAULT_PAGENO = 1;
export const DEFAULT_LIMIT = 5;

@InputType('OffsetLimitInput')
@ArgsType()
export class OffsetLimitArgs {
  @Field(() => Int, {
    defaultValue: DEFAULT_PAGENO,
    description: 'Number of items to skip. Min 1.',
  })
  @IsNumber()
  @Min(1)
  public pageNo = DEFAULT_PAGENO;

  @Field(() => Int, {
    defaultValue: DEFAULT_LIMIT,
    description: 'Number of items to get. Min 1, Max 100.',
  })
  @Min(1)
  @Max(100)
  @IsNumber()
  public limit = DEFAULT_LIMIT;

  public skip: number;
}
