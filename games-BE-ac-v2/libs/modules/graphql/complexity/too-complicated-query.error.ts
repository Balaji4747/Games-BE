import { NotValidClientError, NotValidClientErrorOptions } from '../errors/client/not-valid.error';

export class TooComplicatedQueryClientError extends NotValidClientError {
  public constructor(opts: TooComplicatedQueryClientErrorOptions) {
    super(opts);
  }
}

export interface TooComplicatedQueryClientErrorOptions extends NotValidClientErrorOptions {
  public: {
    complexity: number;
    maxComplexity: number;
  };
}
