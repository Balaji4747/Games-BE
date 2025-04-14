import { HttpStatus } from '@nestjs/common';

import { BaseRichError, BaseRichErrorOptions } from '../rich-error.base';

export class ClientError extends BaseRichError {
  public constructor(opts: BaseRichErrorOptions) {
    super({
      ...opts,
      logLevel: opts.logLevel,
      httpCode: opts.httpCode || HttpStatus.BAD_REQUEST,
      doNotCaptureStack: opts.doNotCaptureStack ?? true,
    });
  }
}
