import { ArgsType, Field } from '@nestjs/graphql';

import { SortDir } from '../types/sort-dir.enum';
import { SortKey } from '../types/sort-key.enum';

@ArgsType()
export class SortArgs {
  @Field(() => SortKey, { defaultValue: SortKey.CREATED_AT })
  public sortKey = SortKey.CREATED_AT;

  @Field(() => SortDir, { defaultValue: SortDir.ASC })
  public sortDir = SortDir.ASC;
}
