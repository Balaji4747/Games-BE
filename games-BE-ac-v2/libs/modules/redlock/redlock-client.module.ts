import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedlockClientModuleAsyncOptions, RedlockClientModuleOptions } from './redlock-client.interfaces';
import {
  createRedlockClient,
  createRedlockClientAsyncProviders,
  createRedlockClientProviders,
} from './redlock-client.providers';
import { RedlockClient } from './redlock.client';

@Global()
@Module({})
export class RedlockClientModule {
  public static forRoot(options: RedlockClientModuleOptions): DynamicModule {
    const providers = createRedlockClientProviders(options);

    return {
      module: RedlockClientModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: RedlockClientModuleAsyncOptions): DynamicModule {
    const providers = createRedlockClientAsyncProviders(options);

    return {
      module: RedlockClientModule,
      imports: options.imports,
      providers,
      exports: providers,
    } as DynamicModule;
  }

  public static createClient(options: RedlockClientModuleOptions): RedlockClient {
    return createRedlockClient(options);
  }
}
