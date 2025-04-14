import { Global, Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from '@provfair/configuration/app';
import { LoggerConfigModule, LoggerConfigService } from '@provfair/configuration/logger';
import { AppLogger } from './services/app-logger.service';
import { buildInternalLogger } from './services/internal-logger.service';

@Global()
@Module({
  imports: [LoggerConfigModule, AppConfigModule],
  providers: [
    {
      provide: AppLogger,
      useFactory: (config: LoggerConfigService, appConfig: AppConfigService) => {
        const { appLogLevel, appMaxDepth } = config;
        return new AppLogger(
          buildInternalLogger({
            appLogLevel,
            appMaxDepth,
            isProd: appConfig.isProd,
          }),
          {
            level: appLogLevel,
            maxDepth: appMaxDepth,
          },
        );
      },
      inject: [LoggerConfigService, AppConfigService],
    },
  ],
  exports: [AppLogger],
})
export class AppLoggerModule {}
