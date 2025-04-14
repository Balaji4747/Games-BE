import { NotValidClientError, NotValidClientErrorOptions } from './not-valid.error';

export class NotUniqueClientError extends NotValidClientError {
  public constructor(opts: NotValidClientErrorOptions) {
    super(opts);
  }
}
