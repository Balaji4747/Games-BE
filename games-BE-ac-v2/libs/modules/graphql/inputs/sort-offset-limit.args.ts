import { ArgsType, IntersectionType } from '@nestjs/graphql';

import { OffsetLimitArgs } from './offset-limit.args';
import { SortArgs } from './sort.args';

@ArgsType()
export class SortOffsetLimitArgs extends IntersectionType(OffsetLimitArgs, SortArgs, ArgsType) {}
