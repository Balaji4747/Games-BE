import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IRedisClientConfigService } from '@provfair/configuration/redis-client';
import { Redis } from 'ioredis';
import { Settings } from 'redlock';

export interface RedlockClientModuleOptions {
  redisClients?: Redis[];
  redisConfigs?: IRedisClientConfigService[];
  options?: Partial<Settings>;
}

export interface RedlockClientModuleOptionsFactory {
  createRedlockClientModuleOptions(): Promise<RedlockClientModuleOptions> | RedlockClientModuleOptions;
}

export interface RedlockClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<RedlockClientModuleOptions> | RedlockClientModuleOptions;
  inject?: any[];
  useClass?: Type<RedlockClientModuleOptionsFactory>;
}
