import { registerEnumType } from '@nestjs/graphql';

export enum SortDir {
  ASC = 1,
  DESC = -1,
}

registerEnumType(SortDir, { name: 'SortDir' });
