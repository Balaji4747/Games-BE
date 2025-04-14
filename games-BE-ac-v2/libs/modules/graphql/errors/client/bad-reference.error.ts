import { NotValidClientError, NotValidClientErrorOptions } from './not-valid.error';

export class BadReferenceClientError extends NotValidClientError {
  public constructor(opts: NotValidClientErrorOptions) {
    super(opts);
  }
}
