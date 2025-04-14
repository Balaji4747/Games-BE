import { registerEnumType } from '@nestjs/graphql';

export enum UserBetType {
  MY = 'MY',
  ALL = 'ALL',
}

registerEnumType(UserBetType, {
  name: 'UserBetType',
});
