import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { RedisClientConfigService } from './configuration.service';

/**
 * Import and provide Federation configuration related classes.
 *ч
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [`.env.redis-client.local`],
    }),
  ],
  providers: [ConfigService, RedisClientConfigService],
  exports: [ConfigService, RedisClientConfigService],
})
export class RedisClientConfigModule {}
