import { BaseRichErrorOptions } from '../rich-error.base';

import { ServerError } from './server.error';

export class NotParsedServerError extends ServerError {
  public constructor(opts: NotParsedServerErrorOptions) {
    super(opts);
  }
}

export interface NotParsedServerErrorOptions extends BaseRichErrorOptions {
  prevErrorMessage: string | Error;
  internal: {
    [key: string]: string;
    rawData: string;
  };
}
