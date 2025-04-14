import { Global, Module } from '@nestjs/common';
import { RedisClientConfigModule, RedisClientConfigService } from '@provfair/configuration/redis-client';
import { MonitoringModule } from '@provfair/monitoring';
import { RedisModule } from '@provfair/redis';
import { SocketIOEmitterService } from './socketEmitter.service';

@Global()
@Module({
  imports: [
    MonitoringModule,
    RedisModule.forRootAsync({
      imports: [RedisClientConfigModule],
      inject: [RedisClientConfigService],
      useFactory: (config: RedisClientConfigService) => {
        return config.redis;
      },
    }),
  ],
  providers: [SocketIOEmitterService],
  exports: [SocketIOEmitterService],
})
export class SocketIOEmitterModule {}
