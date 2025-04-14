export enum RedisDatabase {
  DEFAULT = 0,
  KEYSPACE_EVENTS = 1, // used for key-event notification (session expired,  etc...)
  CACHE_L1 = 2, // for L1 service cache
}
