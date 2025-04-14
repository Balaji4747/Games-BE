import { DEFAULT_LIMIT, OffsetLimitArgs } from '../inputs/offset-limit.args';

export function getPaginatedComplexity({ limit }: Partial<OffsetLimitArgs>, childComplexity: number): number {
  return (limit || DEFAULT_LIMIT) * childComplexity;
}
