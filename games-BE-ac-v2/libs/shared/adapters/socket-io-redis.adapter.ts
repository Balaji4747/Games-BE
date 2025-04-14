/* eslint-disable new-cap */
import * as Redis from 'ioredis';

import { INestApplication } from '@nestjs/common';
import { RedisClientConfigService } from '@provfair/configuration/redis-client';
import { createAdapter } from '@socket.io/redis-adapter';
import { IoSocketIOAdapter } from './socket.io.adapter';

export class RedisIoAdapter extends IoSocketIOAdapter {
  constructor(
    readonly app: INestApplication,
    private readonly config: RedisClientConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    const pubClient = new Redis.default(this.config.redis);
    const subClient = new Redis.default(this.config.redis);

    const redisAdapter = createAdapter(pubClient, subClient);

    server.adapter(redisAdapter);

    return server;
  }
}
