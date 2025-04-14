import { Provider, Type } from '@nestjs/common';

import { REDLOCK_CLIENT_MODULE_OPTIONS, REDLOCK_CLIENT_MODULE_PROVIDER } from './redlock-client.constants';

import {
  RedlockClientModuleAsyncOptions,
  RedlockClientModuleOptions,
  RedlockClientModuleOptionsFactory,
} from './redlock-client.interfaces';

import { RedlockClient } from './redlock.client';

export function createRedlockClient(options: RedlockClientModuleOptions): RedlockClient {
  return new RedlockClient(options);
}

export function createRedlockClientProviders(clientOpts: RedlockClientModuleOptions): Provider[] {
  return [
    {
      provide: REDLOCK_CLIENT_MODULE_PROVIDER,
      inject: [],
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      useFactory: () => createRedlockClient(clientOpts),
    },
    {
      provide: RedlockClient,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      useFactory: (client: RedlockClient) => client,
      inject: [REDLOCK_CLIENT_MODULE_PROVIDER],
    },
  ];
}

export function createRedlockClientAsyncProviders(options: RedlockClientModuleAsyncOptions): Provider[] {
  const providers: Provider[] = [
    {
      provide: REDLOCK_CLIENT_MODULE_PROVIDER,
      useFactory: (clientOpts: RedlockClientModuleOptions) => createRedlockClient(clientOpts),
      inject: [REDLOCK_CLIENT_MODULE_OPTIONS],
    },
    {
      provide: RedlockClient,
      useFactory: (opt: RedlockClientModuleOptions) => {
        return new RedlockClient(opt);
      },
      inject: [REDLOCK_CLIENT_MODULE_OPTIONS],
    },
  ];

  if (options.useClass) {
    const useClass = options.useClass as Type<RedlockClientModuleOptionsFactory>;
    providers.push(
      ...[
        {
          provide: REDLOCK_CLIENT_MODULE_OPTIONS,
          useFactory: async (optionsFactory: RedlockClientModuleOptionsFactory) =>
            optionsFactory.createRedlockClientModuleOptions(),
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
      provide: REDLOCK_CLIENT_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    });
  }

  return providers;
}
