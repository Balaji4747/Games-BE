import { DynamicModule, Global, Module } from '@nestjs/common';
import { FederationClientModuleAsyncOptions, FederationClientModuleOptions } from './federation-client.interfaces';
import {
  createFederationClient,
  createFederationClientAsyncProviders,
  createFederationClientProviders,
} from './federation-client.providers';

@Global()
@Module({})
export class FederationClientModule {
  public static forRoot(options: FederationClientModuleOptions): DynamicModule {
    const providers = createFederationClientProviders(options);

    return {
      module: FederationClientModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: FederationClientModuleAsyncOptions): DynamicModule {
    const providers = createFederationClientAsyncProviders(options);

    return {
      module: FederationClientModule,
      imports: options.imports,
      providers,
      exports: providers,
    } as DynamicModule;
  }

  public static createCLient(options: FederationClientModuleOptions) {
    return createFederationClient(options);
  }
}
