import { ILoggerServiceConfig } from '../app-logger.interfaces';
import { InternalLogger } from './internal-logger.service';

export class AbstractLogger {
  public readonly logger: InternalLogger;

  constructor(baseLogger: InternalLogger, { level }: ILoggerServiceConfig) {
    this.logger = baseLogger.child({
      level,
    });
  }
}
