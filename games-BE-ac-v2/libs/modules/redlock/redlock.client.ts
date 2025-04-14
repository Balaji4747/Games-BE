import { OnApplicationShutdown } from '@nestjs/common';
import * as Redis from 'ioredis';
import Redlock, { ExecutionResult, Lock } from 'redlock';
import { RedlockClientModuleOptions } from './redlock-client.interfaces';

export class RedlockClient implements OnApplicationShutdown {
  private readonly redlock: Redlock;

  constructor(clientOptions: RedlockClientModuleOptions) {
    const { options, redisClients, redisConfigs } = clientOptions;

    if (redisClients && redisClients.length > 0) {
      this.redlock = new Redlock(redisClients, options);
      return;
    }

    if (redisConfigs && redisConfigs.length > 0) {
      // eslint-disable-next-line new-cap
      const clients = redisConfigs.map((config) => new Redis.default(config));
      this.redlock = new Redlock(clients, options);
      return;
    }

    throw new Error('Redis clients array or redis config array should be passed.');
  }

  async onApplicationShutdown(): Promise<void> {
    await this.redlock.quit();
  }

  /**
   * This method locks a resource using the redlock algorithm.
   *
   * ```js
   * redlock.lock(
   *   'some-resource',       // the resource to lock
   *   2000,                  // ttl in ms
   *   function(err, lock) {  // callback function (optional)
   *     ...
   *   }
   * )
   * ```
   *
   * @param resource - one or more resources to lock
   * @param ttl - how long to keep the lock (milliseconds)
   */
  public async lock(resource: string | string[], ttl: number): Promise<Lock> {
    return this.redlock.acquire(Array.isArray(resource) ? resource : [resource], ttl);
  }

  /**
   * This method unlocks the provided lock from all servers still persisting it.
   * It will fail with an error if it is unable to release the lock on a quorum
   * of nodes, but will make no attempt to restore the lock in the case of a
   * failure to release. It is safe to re-attempt a release or to ignore the
   * error, as the lock will automatically expire after its timeout.
   *
   * ```js
   * redlock.lock(
   *   'some-resource',       // the resource to lock
   *   2000,                  // ttl in ms
   *   function(err, lock) {  // callback function (optional)
   *     ...
   *   }
   * )
   * ```
   *
   * @param locker - Lock instance with received from this.redlock.acquire()
   */
  public async unlock(locker: Lock): Promise<ExecutionResult | null> {
    if (locker && Date.now() < locker.expiration && locker.expiration !== 0) {
      await locker.release();
    }

    return null;
  }
}
