export interface ISetLocalCacheInput<T> {
  readonly data: T;
  readonly key: string;
  /**
   * Expire time in seconds, 0 = never expire
   */
  readonly expire: number;
}
