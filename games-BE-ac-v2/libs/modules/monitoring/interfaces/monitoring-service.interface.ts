import { IMonitoringErrorPayload, IMonitoringPayload } from './monitoring-payload.interface';

export interface IMonitoringService {
  info: (message: string, payload?: IMonitoringPayload) => void;
  debug: (message: string, payload?: IMonitoringPayload) => void;
  trace: (message: string, payload?: IMonitoringPayload) => void;
  warn: (message: string, payload?: IMonitoringPayload) => void;
  error: (message: string, payload?: IMonitoringErrorPayload) => void;
  fatal: (message: string, payload?: IMonitoringErrorPayload) => void;
  verbose: (message: string, payload?: IMonitoringPayload) => void;
}
