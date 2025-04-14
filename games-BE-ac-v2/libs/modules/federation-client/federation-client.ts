import { getSdk, Sdk, SdkFunctionWrapper } from './generated/graphql';

import { GraphQLClient } from 'graphql-request';
import { FederationClientModuleOptions } from './federation-client.interfaces';

export class FederationClient {
  private client: GraphQLClient;
  private sdk: Sdk;

  constructor(private readonly options: FederationClientModuleOptions) {
    this.client = new GraphQLClient(options.url);
    this.sdk = getSdk(this.client, this.errorMiddleware);
  }

  private errorMiddleware: SdkFunctionWrapper = async <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
  ): Promise<T> => {
    return new Promise((resolve, reject) => {
      action()
        .then(resolve)
        .catch((error) => {
          const reqRes = JSON.parse(JSON.stringify(error));
          return reject(
            new Error(
              reqRes.message ??
                reqRes.response?.message ??
                reqRes.response?.errors[0]?.message ??
                'Something went wrong while doing graphql request!',
            ),
          );
        });
    });
  };

  async call<K extends keyof ReturnType<typeof getSdk>>(
    method: K,
    args: Parameters<ReturnType<typeof getSdk>[K]>[0],
    token?: string,
  ): Promise<ReturnType<ReturnType<typeof getSdk>[K]>> {
    const requestHeaders: Parameters<ReturnType<typeof getSdk>[K]>[1] = {};

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const sdkMethod: any = this.sdk[method];

    return sdkMethod(args, requestHeaders);
  }
}
