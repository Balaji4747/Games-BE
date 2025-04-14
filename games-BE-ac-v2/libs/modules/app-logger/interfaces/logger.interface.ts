export interface ILoggerPayload {
  readonly context?: string;
  readonly data?: any;
  readonly timeSpend?: number;
}

export interface ILoggerErrorPayload extends ILoggerPayload {
  readonly error?: unknown;
}

export interface IAppLogger {
  info: (message: string, payload?: ILoggerPayload) => void;
  debug: (message: string, payload?: ILoggerPayload) => void;
  trace: (message: string, payload?: ILoggerPayload) => void;
  warn: (message: string, payload?: ILoggerPayload) => void;
  error: (message: string, payload?: ILoggerErrorPayload) => void;
  fatal: (message: string, payload?: ILoggerErrorPayload) => void;
}
