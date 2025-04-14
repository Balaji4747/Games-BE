import { registerEnumType } from '@nestjs/graphql';

export enum SortKey {
  // KEY = 'entityFieldName'
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

registerEnumType(SortKey, { name: 'SortKey' });
