import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { formatClassValidatorError } from '../formats/class-validator';
import { BaseRichErrorOptions } from '../rich-error.base';

import { ClientError } from './client.error';

export class NotValidClientError extends ClientError {
  public constructor(opts: NotValidClientErrorOptions) {
    super({
      ...opts,
      httpCode: opts.httpCode || HttpStatus.UNPROCESSABLE_ENTITY, // see https://stackoverflow.com/questions/16133923/400-vs-422-response-to-post-of-data
    });

    if (opts.publicErrors) {
      this.public = this.public || {};
      this.public.errors = opts.publicErrors.map((error) => formatClassValidatorError(error));
    }

    if (opts.internalErrors) {
      this.internal = this.internal || {};
      this.internal.errors = opts.internalErrors.map((error) => formatClassValidatorError(error));
    }
  }
}

export interface NotValidClientErrorOptions extends BaseRichErrorOptions {
  /**
   * They will be formatted and assigned to public.errors instance field.
   */
  publicErrors?: ValidationError[];

  /**
   * They will be formatted and assigned to internal.errors instance field.
   */
  internalErrors?: ValidationError[];
}
