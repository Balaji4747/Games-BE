import { HttpStatus } from '@nestjs/common';
import { BaseRichErrorOptions } from '../rich-error.base';
import { ClientError } from './client.error';

export interface NotAuthorizedClientErrorOptions extends Omit<BaseRichErrorOptions, 'message'> {
  message?: string;
}
export class NotAuthorizedClientError extends ClientError {
  public constructor(opts: NotAuthorizedClientErrorOptions) {
    super({
      ...opts,
      message: opts.message || `You are not allowed to do this. The Superadmin will punish you.`,
      // 403 Forbidden. The client does not have access rights to the content; that is,
      // it is unauthorized, so the server is refusing to give the requested resource.
      // Unlike 401, the client's identity is known to the server.
      httpCode: opts.httpCode || HttpStatus.FORBIDDEN,
    });
  }
}
