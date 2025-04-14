import { HttpStatus } from '@nestjs/common';

import { BaseRichErrorOptions } from '../rich-error.base';

import { ClientError } from './client.error';

export class NotImplementedClientError extends ClientError {
  public constructor({ path, ...opts }: NotImplementedClientErrorOptions) {
    super({
      ...opts,
      message: opts.message ? opts.message : `${path} not implemented.`,
      httpCode: opts.httpCode || HttpStatus.NOT_IMPLEMENTED,
    });

    this.message = `${this.context} ${this.message}`;
  }
}

export interface NotImplementedClientErrorOptions extends Omit<BaseRichErrorOptions, 'message'> {
  /**
   * A path to not implemented functionality.
   */
  path: string;

  message?: string;
}
