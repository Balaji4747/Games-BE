import { RegisterQueueAsyncOptions, RegisterQueueOptions } from '@nestjs/bullmq';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';

export const PLAYERS_QUEUE = 'be_players_queue';

export const PLAYERS_QUEUE_CONFIG: RegisterQueueAsyncOptions = {
  name: PLAYERS_QUEUE,
  imports: [RedisClientConfigModule],
  inject: [RedisClientConfigService],
  useFactory: (conf: RedisClientConfigService): RegisterQueueOptions => ({
    connection: conf.redis,
    defaultJobOptions: {
      removeOnComplete: true,
    },
  }),
};

export const HILO_QUEUE = 'be_hilo_queue';

export const HILO_QUEUE_CONFIG: RegisterQueueAsyncOptions = {
  name: HILO_QUEUE,
  imports: [RedisClientConfigModule],
  inject: [RedisClientConfigService],
  useFactory: (conf: RedisClientConfigService): RegisterQueueOptions => ({
    connection: conf.redis,
    defaultJobOptions: {
      removeOnComplete: true,
    },
  }),
};

export const MINES_QUEUE = 'be_mines_queue';

export const MINES_QUEUE_CONFIG: RegisterQueueAsyncOptions = {
  name: MINES_QUEUE,
  imports: [RedisClientConfigModule],
  inject: [RedisClientConfigService],
  useFactory: (conf: RedisClientConfigService): RegisterQueueOptions => ({
    connection: conf.redis,
    defaultJobOptions: {
      removeOnComplete: true,
    },
  }),
};

export const BOTTLESMASH_QUEUE = 'be_bottlesmash_queue';

export const BOTTLESMASH_QUEUE_CONFIG: RegisterQueueAsyncOptions = {
  name: BOTTLESMASH_QUEUE,
  imports: [RedisClientConfigModule],
  inject: [RedisClientConfigService],
  useFactory: (conf: RedisClientConfigService): RegisterQueueOptions => ({
    connection: conf.redis,
    defaultJobOptions: {
      removeOnComplete: true,
    },
  }),
};

export const OVERANDOUT_QUEUE = 'be_overandout_queue';

export const OVERANDOUT_QUEUE_CONFIG: RegisterQueueAsyncOptions = {
  name: OVERANDOUT_QUEUE,
  imports: [RedisClientConfigModule],
  inject: [RedisClientConfigService],
  useFactory: (conf: RedisClientConfigService): RegisterQueueOptions => ({
    connection: conf.redis,
    defaultJobOptions: {
      removeOnComplete: true,
    },
  }),
};
