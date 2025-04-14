import { DynamicModule, Module } from '@nestjs/common';
import { RedisCoreModule } from './redis-core.module';
import { RedisDatabase } from './redis-database.enum';
import { RedisModuleAsyncOptions, RedisModuleOptions } from './redis.interface';

@Module({})
export class RedisModule {
  public static forRoot(options: RedisModuleOptions, database?: RedisDatabase): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRoot(options, database)],
      exports: [RedisCoreModule],
    };
  }

  public static forRootAsync(options: RedisModuleAsyncOptions, database?: RedisDatabase): DynamicModule {
    return {
      module: RedisModule,
      imports: [RedisCoreModule.forRootAsync(options, database)],
      exports: [RedisCoreModule],
    };
  }
}
