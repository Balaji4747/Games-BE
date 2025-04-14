import { Injectable } from '@nestjs/common';

import { AppLogger } from '@provfair/logger';
import { IMonitoringErrorPayload, IMonitoringPayload } from './interfaces/monitoring-payload.interface';
import { IMonitoringService } from './interfaces/monitoring-service.interface';

@Injectable()
export class MonitoringService implements IMonitoringService {
  constructor(private readonly logger: AppLogger) {}

  public info(message: string, payload?: IMonitoringPayload): void {
    this.logger.info(message, payload);
  }

  public debug(message: string, payload?: IMonitoringPayload): void {
    this.logger.debug(message, payload);
  }

  public trace(message: string, payload?: IMonitoringPayload): void {
    this.logger.trace(message, payload);
  }

  public warn(message: string, payload?: IMonitoringPayload): void {
    this.logger.warn(message, payload);
  }

  public error(message: string, payload?: IMonitoringErrorPayload): void {
    this.logger.error(message, payload);
  }

  public fatal(message: string, payload?: IMonitoringErrorPayload): void {
    this.logger.fatal(message, payload);
  }

  public verbose(message: string, payload?: IMonitoringPayload): void {
    this.logger.verbose(message, payload);
  }
}
