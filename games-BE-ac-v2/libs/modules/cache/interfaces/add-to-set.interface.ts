export interface IAddToSetCacheInput {
  readonly element: { field: string; value: string };
  readonly key: string;
  /**
   * Expire time in seconds, 0 = never expire
   */
  readonly expire?: number;
}
