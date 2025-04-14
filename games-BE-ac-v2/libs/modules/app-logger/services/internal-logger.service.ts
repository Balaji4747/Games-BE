// import * as winston from 'winston';
import pino, { Logger, destination } from 'pino';
import { ILoggerConfig } from '../app-logger.interfaces';

export type InternalLogger = Logger;

export function buildInternalLogger({ isProd, appLogLevel }: ILoggerConfig): InternalLogger {
  const pretty = {
    levelFirst: true,
    ignore: 'pid,hostname',
    translateTime: true,
    colorize: false,
  };

  // Print logs to file in prod and on dev print to STDOUT
  const dest = isProd
    ? destination({
        dest: 'logs/application.log',
        sync: false,
        mkdir: true,
      })
    : undefined;

  const logger = pino(
    {
      level: appLogLevel,
      formatters: {
        level: (label) => {
          return { level: label };
        },
        bindings: () => ({}),
      },
      timestamp: () => {
        const now = new Date();
        return `,"time":"${now.toISOString()}"`;
      },
      // ...(!isProd && {
      //   // This will print logs to STDOUT
      //   transport: {
      //     target: 'pino-pretty',
      //     options: pretty,
      //   },
      // }),
    },
    dest,
  );

  return logger;
}
