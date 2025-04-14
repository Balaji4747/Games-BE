import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RedisDatabase } from './redis-database.enum';
import { RedisModuleAsyncOptions, RedisModuleOptions, RedisModuleOptionsFactory } from './redis.interface';
import { createRedisConnection, getRedisConnectionToken, getRedisOptionsToken } from './redis.utils';

@Global()
@Module({})
export class RedisCoreModule {
  static forRoot(options: RedisModuleOptions, database?: RedisDatabase): DynamicModule {
    const config: RedisModuleOptions = {
      ...options,
      db: database,
    };

    const redisOptionsProvider: Provider = {
      provide: getRedisOptionsToken(database),
      useValue: config,
    };

    const redisConnectionProvider: Provider = {
      provide: getRedisConnectionToken(database),
      useValue: createRedisConnection(config),
    };

    return {
      module: RedisCoreModule,
      providers: [redisOptionsProvider, redisConnectionProvider],
      exports: [redisOptionsProvider, redisConnectionProvider],
    };
  }

  public static forRootAsync(options: RedisModuleAsyncOptions, database: RedisDatabase): DynamicModule {
    const redisConnectionProvider: Provider = {
      provide: getRedisConnectionToken(database),
      useFactory(_options: RedisModuleOptions) {
        return createRedisConnection({
          ..._options,
          db: database,
        });
      },
      inject: [getRedisOptionsToken(database)],
    };

    return {
      module: RedisCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, database), redisConnectionProvider],
      exports: [redisConnectionProvider],
    };
  }

  public static createAsyncProviders(options: RedisModuleAsyncOptions, database?: RedisDatabase): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, database)];
    }

    return [
      this.createAsyncOptionsProvider(options, database),
      { provide: options.useClass, useClass: options.useClass },
    ];
  }

  public static createAsyncOptionsProvider(options: RedisModuleAsyncOptions, database?: RedisDatabase): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getRedisOptionsToken(database),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      provide: getRedisOptionsToken(database),
      async useFactory(optionsFactory: RedisModuleOptionsFactory): Promise<RedisModuleOptions> {
        return optionsFactory.createRedisModuleOptions();
      },
      inject: [options.useClass || options.useExisting],
    };
  }
}
