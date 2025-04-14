import { GraphQLFormattedError } from 'graphql';

import { BaseRichErrorOptions } from '../rich-error.base';

import { ClientError } from './client.error';

export class RemoteCallError extends ClientError {
  public internal!: {
    [key: string]: unknown;
    request?: unknown;
    response?: unknown;
    errors?: GraphQLFormattedError[];
  };

  public constructor(opts: RemoteCallErrorOptions) {
    super(opts);
  }
}

export interface RemoteCallErrorOptions extends BaseRichErrorOptions {
  internal: {
    [key: string]: unknown;
    request?: unknown;
    response?: unknown;
    errors?: GraphQLFormattedError[];
  };
}
