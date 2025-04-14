import { BaseRichError, BaseRichErrorOptions } from '../rich-error.base';

export class ServerError extends BaseRichError {
  public constructor(opts: BaseRichErrorOptions) {
    super(opts);

    this.internal = this.internal || {};

    this.internal.name = this.name;
    this.internal.message = this.message;
    this.internal.httpCode = this.httpCode;

    this.name = BaseRichError.internalServerError.name;
    // this.message = opts.message ?? BaseRichError.internalServerError.message;
    this.httpCode = BaseRichError.internalServerError.httpCode;
  }
}
