import { NotValidClientError, NotValidClientErrorOptions } from './not-valid.error';

export class WrongAuthTokenClientError extends NotValidClientError {
  public constructor(opts: Omit<NotValidClientErrorOptions, 'message'>) {
    super({
      message: 'Wrong auth token.',
      ...opts,
    });
  }
}
