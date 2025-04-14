import { Inject } from '@nestjs/common';
import { RedisDatabase } from './redis-database.enum';
import { getRedisConnectionToken } from './redis.utils';

export const InjectRedis = (database?: RedisDatabase): ReturnType<typeof Inject> => {
  return Inject(getRedisConnectionToken(database));
};
