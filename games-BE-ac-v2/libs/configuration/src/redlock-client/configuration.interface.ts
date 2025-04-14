export interface IRedlockClientConfigService {
  /**
   * Retry attempts delay. Default value 500.
   */
  readonly retryDelay: number;

  /**
   * Retry attempts count. Default value 81.
   */
  readonly retryCount: number;

  /**
   * Lock expires time. Default value 4000.
   */
  readonly ttl: number;
}
