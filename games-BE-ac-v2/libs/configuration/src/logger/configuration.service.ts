import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerConfig } from '@provfair/logger';

export const LOGGER_CONFIG_SERVICE = 'LoggerConfigService';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class LoggerConfigService implements ILoggerConfig {
  constructor(private configService: ConfigService) {}

  get appLogLevel(): string {
    return this.configService.get('logger.appLogLevel');
  }

  get appMaxDepth(): number {
    return this.configService.get('logger.appMaxDepth');
  }
}
