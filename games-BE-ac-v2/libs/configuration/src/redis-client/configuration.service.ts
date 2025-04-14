import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MonitoringService } from '@provfair/monitoring';
import { IRedisClientConfigService } from './configuration.interface';

export const REDIS_CONFIG_SERVICE = 'RedisClientConfigService';
export const REDIS_RECONNECTION_TIMEOUT_MS = 1000;

@Injectable()
export class RedisClientConfigService {
  constructor(
    private readonly configService: ConfigService,
    private readonly monitor: MonitoringService,
  ) {}

  get redis(): IRedisClientConfigService {
    const config = this.configService.get<IRedisClientConfigService>('redis-client');

    return {
      ...config,
      retryStrategy: (times) => {
        const path = `${config.host}:${config.port}`;
        this.monitor.error(`Retry connect to redis ${path}, ${times} time(s)`);
        return REDIS_RECONNECTION_TIMEOUT_MS;
      },
    };
  }
}
