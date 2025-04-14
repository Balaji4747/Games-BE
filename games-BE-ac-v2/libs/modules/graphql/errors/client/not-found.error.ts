import { HttpStatus } from '@nestjs/common';

import { BaseRichErrorOptions } from '../rich-error.base';

import { ClientError } from './client.error';

export class NotFoundClientError extends ClientError {
  public constructor(opts: BaseRichErrorOptions) {
    super({
      ...opts,
      httpCode: opts.httpCode || HttpStatus.NOT_FOUND,
    });
  }
}
