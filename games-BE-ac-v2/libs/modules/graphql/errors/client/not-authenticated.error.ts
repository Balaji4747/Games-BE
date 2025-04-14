import { HttpStatus } from '@nestjs/common';
import { BaseRichErrorOptions } from '../rich-error.base';
import { ClientError } from './client.error';

export class NotAuthenticatedClientError extends ClientError {
  public constructor(opts: NotAuthenticatedClientErrorOptions) {
    super({
      ...opts,
      message: opts.message || 'Not authenticated',
      // 401 Unauthorized. Although the HTTP standard specifies "unauthorized",
      // semantically this response means "unauthenticated".
      // That is, the client must authenticate itself to get the requested response.
      httpCode: opts.httpCode || HttpStatus.UNAUTHORIZED,
    });
  }
}

export interface NotAuthenticatedClientErrorOptions extends Omit<BaseRichErrorOptions, 'message'> {
  message?: string;
}
