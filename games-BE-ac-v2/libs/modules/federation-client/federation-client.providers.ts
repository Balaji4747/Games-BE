import { Provider, Type } from '@nestjs/common';

import { FEDERATION_CLIENT_MODULE_OPTIONS, FEDERATION_CLIENT_MODULE_PROVIDER } from './federation-client.constants';

import { FederationClient } from './federation-client';
import {
  FederationClientModuleAsyncOptions,
  FederationClientModuleOptions,
  FederationClientModuleOptionsFactory,
} from './federation-client.interfaces';

export function createFederationClient(clientOpts: FederationClientModuleOptions): FederationClient {
  return new FederationClient(clientOpts);
}

export function createFederationClientProviders(clientOpts: FederationClientModuleOptions): Provider[] {
  return [
    {
      provide: FEDERATION_CLIENT_MODULE_PROVIDER,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      useFactory: () => createFederationClient(clientOpts),
    },
    {
      provide: FederationClient,
      useFactory: (client: FederationClient) => client,
      inject: [FEDERATION_CLIENT_MODULE_PROVIDER],
    },
  ];
}

export function createFederationClientAsyncProviders(options: FederationClientModuleAsyncOptions): Provider[] {
  const providers: Provider[] = [
    {
      provide: FEDERATION_CLIENT_MODULE_PROVIDER,
      useFactory: (clientOpts: FederationClientModuleOptions) => createFederationClient(clientOpts),
      inject: [FEDERATION_CLIENT_MODULE_OPTIONS],
    },
    {
      provide: FederationClient,
      useFactory: (option: FederationClientModuleOptions) => {
        return new FederationClient(option);
      },
      inject: [FEDERATION_CLIENT_MODULE_OPTIONS],
    },
  ];

  if (options.useClass) {
    const useClass = options.useClass as Type<FederationClientModuleOptionsFactory>;
    providers.push(
      ...[
        {
          provide: FEDERATION_CLIENT_MODULE_OPTIONS,
          useFactory: async (optionsFactory: FederationClientModuleOptionsFactory) =>
            optionsFactory.createFederationClientModuleOptions(),
          inject: [useClass],
        },
        {
          provide: useClass,
          useClass,
        },
      ],
    );
  }

  if (options.useFactory) {
    providers.push({
      provide: FEDERATION_CLIENT_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    });
  }

  return providers;
}
