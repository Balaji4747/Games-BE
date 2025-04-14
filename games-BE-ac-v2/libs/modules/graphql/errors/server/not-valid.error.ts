import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { formatClassValidatorError } from '../formats/class-validator';
import { BaseRichErrorOptions } from '../rich-error.base';

import { ServerError } from './server.error';

export class NotValidServerError extends ServerError {
  public constructor(opts: NotValidServerErrorOptions) {
    super({
      ...opts,
      httpCode: opts.httpCode || HttpStatus.UNPROCESSABLE_ENTITY, // see https://stackoverflow.com/questions/16133923/400-vs-422-response-to-post-of-data
    });

    if (opts.internalErrors) {
      this.internal = this.internal || {};
      this.internal.errors = opts.internalErrors.map((error) => formatClassValidatorError(error));
    }
  }
}

export interface NotValidServerErrorOptions extends BaseRichErrorOptions {
  /**
   * They will be formatted and assigned to internal.errors instance field.
   */
  internalErrors?: ValidationError[];
}
