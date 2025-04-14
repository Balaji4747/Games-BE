export interface IPushToListCacheInput<T> {
  readonly pushType: 'rpush' | 'lpush';
  readonly elements: T[];
  readonly key: string;
  /**
   * Expire time in seconds, 0 = never expire
   */
  readonly expire: number;
}
