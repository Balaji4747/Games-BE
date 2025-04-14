import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface ILoggerConfig {
  appLogLevel: string;
  appMaxDepth: number;
  isProd?: boolean;
}

export interface ILoggerServiceConfig {
  level: string;
  maxDepth?: number;
}

export interface AppLoggerModuleOptionsFactory {
  createAppLoggerModuleOptions(): Promise<any> | any;
}

export interface AppLoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<any> | any;
  inject?: any[];
  useClass?: Type<AppLoggerModuleOptionsFactory>;
}
