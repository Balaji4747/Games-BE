import Redis from 'ioredis';
import { RedisDatabase } from './redis-database.enum';
import { REDIS_MODULE_CONNECTION, REDIS_MODULE_CONNECTION_TOKEN, REDIS_MODULE_OPTIONS_TOKEN } from './redis.constants';
import { RedisModuleOptions } from './redis.interface';

type RedisDatabaseMap = { [key in RedisDatabase]: number };

const redisDatabaseMap: RedisDatabaseMap = {
  [RedisDatabase.DEFAULT]: 0,
  [RedisDatabase.KEYSPACE_EVENTS]: 1,
  [RedisDatabase.CACHE_L1]: 2,
};

export function getRedisDatabaseIndex(database?: RedisDatabase): number {
  if (!database) {
    return redisDatabaseMap[RedisDatabase.DEFAULT];
  }

  return redisDatabaseMap[database];
}

export function getRedisOptionsToken(database?: RedisDatabase): string {
  return `${getRedisDatabaseIndex(database) || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_OPTIONS_TOKEN}`;
}

export function getRedisConnectionToken(database?: RedisDatabase): string {
  return `${getRedisDatabaseIndex(database) || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_CONNECTION_TOKEN}`;
}

export function createRedisConnection(options: RedisModuleOptions): Redis {
  const redis = new Redis(options);

  redis.on('connect', () => console.debug('Redis connecting'));
  redis.on('ready', () => console.info('Redis connected'));
  redis.on('reconnecting', () => console.debug('Redis reconnecting'));
  redis.on('end', () => console.info('Redis end'));
  redis.on('error', (err) => console.error('Redis ' + err));

  process.once('SIGTERM', () => {
    console.log('quit redis. start');
    redis.disconnect();
    console.log('quit redis. finish');
  });

  return redis;
}
