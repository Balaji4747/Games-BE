import { HttpStatus } from '@nestjs/common';

import { BaseRichErrorOptions } from '../rich-error.base';

import { ServerError } from './server.error';

export class NotFoundServerError extends ServerError {
  public constructor(opts: BaseRichErrorOptions) {
    super({
      ...opts,
      httpCode: opts.httpCode || HttpStatus.NOT_FOUND,
    });
  }
}
