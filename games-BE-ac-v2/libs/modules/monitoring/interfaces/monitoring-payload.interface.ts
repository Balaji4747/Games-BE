export interface IMonitoringPayload {
  readonly context?: string;
  readonly data?: unknown;
  readonly timeSpend?: number;
}

export interface IMonitoringErrorPayload extends IMonitoringPayload {
  readonly error?: unknown;
}
