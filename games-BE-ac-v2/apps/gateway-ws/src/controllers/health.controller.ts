import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus';
import { InjectRedis, Redis, RedisDatabase } from '@provfair/redis';
import { RedisHealthIndicator } from 'libs/indicators/redis-healthcheck.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @InjectRedis(RedisDatabase.CACHE_L1) private readonly redisService: Redis,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => new RedisHealthIndicator(this.redisService).pingCheck(),
    ]);
  }
}
