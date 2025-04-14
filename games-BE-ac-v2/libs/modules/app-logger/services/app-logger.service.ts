/* eslint-disable @typescript-eslint/dot-notation */
import { LoggerService as CommonLoggerService, Injectable } from '@nestjs/common';

import { getAppConfigFromEnv } from '@provfair/configuration/app';
import { getLoggerConfigFromEnv } from '@provfair/configuration/logger';
import { ILoggerServiceConfig } from '../app-logger.interfaces';
import { convertToPlainObject, removeSensitiveData } from '../helpers/helpers';
import { IAppLogger, ILoggerErrorPayload, ILoggerPayload } from '../interfaces/logger.interface';
import { sensitiveKeys } from '../sensitive-fields';
import { AbstractLogger } from './abstract-logger.service';
import { buildInternalLogger } from './internal-logger.service';

@Injectable()
export class AppLogger extends AbstractLogger implements IAppLogger {
  private readonly maxDepth: number;

  constructor(baseLogger, config: ILoggerServiceConfig) {
    super(baseLogger, config);
    this.maxDepth = config.maxDepth;
  }

  /**
   * NestJs common logger interface decoration
   *
   * @returns standard interface for NESTjs logger
   */
  public get CommonLoggerInterface(): CommonLoggerService {
    return {
      error: (message: string, payload?: ILoggerErrorPayload): void => {
        this.error(message, payload);
      },
      log: (message: string, payload?: ILoggerPayload): void => {
        this.info(message, payload);
      },
      warn: (message: string, payload?: ILoggerErrorPayload): void => {
        this.warn(message, payload);
      },
      debug: (message: string, payload?: ILoggerPayload): void => {
        this.debug(message, payload);
      },
      verbose: (message: string, payload?: ILoggerPayload): void => {
        this.trace(message, payload);
      },
    } as CommonLoggerService;
  }

  public info(message: string, payload?: ILoggerPayload): void {
    this.logger.info(...this.preparePayload(message, payload));
  }

  public debug(message: string, payload?: ILoggerPayload): void {
    this.logger.debug(...this.preparePayload(message, payload));
  }

  public trace(message: string, payload?: ILoggerPayload): void {
    this.logger.trace(...this.preparePayload(message, payload));
  }

  public warn(message: string, payload?: ILoggerPayload): void {
    this.logger.warn(...this.preparePayload(message, payload));
  }

  public error(message: string, payload?: ILoggerErrorPayload): void {
    this.logger.error(...this.preparePayload(message, payload));
  }

  public fatal(message: string, payload?: ILoggerErrorPayload): void {
    this.logger.fatal(...this.preparePayload(message, payload));
  }

  public verbose(message: string, payload?: ILoggerPayload): void {
    this.logger.debug(...this.preparePayload(message, payload));
  }

  private preparePayload(message: string, payload?: ILoggerErrorPayload): [any, string?, unknown?, unknown?] {
    const highOrderLogs = {
      context: payload?.context,
      timeSpend: payload?.timeSpend,
    };

    if (!payload?.data && !payload?.error) {
      return [highOrderLogs, message];
    }

    if (!payload?.error) {
      const payloadData = removeSensitiveData(payload.data, sensitiveKeys, this.maxDepth);

      return [highOrderLogs, `${message}, payload: %j`, payloadData];
    }

    if (!payload?.data) {
      if (payload.error instanceof Error) {
        const err = convertToPlainObject(payload.error);

        const payloadData = removeSensitiveData(err, sensitiveKeys, this.maxDepth);
        return [highOrderLogs, `${message}, error: %j`, payloadData];
      }

      const payloadData = removeSensitiveData(payload.error, sensitiveKeys, this.maxDepth);
      return [highOrderLogs, `${message}, error: %j`, payloadData];
    }

    const payloadData = removeSensitiveData(payload.data, sensitiveKeys, this.maxDepth);
    let errorData;

    if (payload.error instanceof Error) {
      const err = convertToPlainObject(payload.error);

      errorData = removeSensitiveData(err, sensitiveKeys, this.maxDepth);
    } else {
      errorData = removeSensitiveData(payload.error, sensitiveKeys, this.maxDepth);
    }

    return [highOrderLogs, `${message}, payload: %j, error: %j`, payloadData, errorData];
  }
}

export function buildStartupLogger() {
  const config = getLoggerConfigFromEnv();
  const appConfig = getAppConfigFromEnv();

  const internalLogger = buildInternalLogger({
    ...config,
    isProd: appConfig.env === 'production',
  });
  return new AppLogger(internalLogger, {
    level: config.appLogLevel,
    maxDepth: config.appMaxDepth,
  });
}
