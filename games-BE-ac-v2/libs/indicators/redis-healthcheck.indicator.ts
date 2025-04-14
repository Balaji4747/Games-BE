import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Redis } from '@provfair/redis';

export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisClient: Redis) {
    super();
  }

  async pingCheck(): Promise<HealthIndicatorResult> {
    const response = await this.redisClient.ping();

    if (response !== 'PONG') {
      throw new HealthCheckError('Redis failed', response);
    }

    return {
      redis: {
        status: 'up',
      },
    };
  }
}
