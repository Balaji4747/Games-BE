import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface FederationClientModuleOptions {
  url: string;
  token?: string;
}

export interface FederationClientModuleOptionsFactory {
  createFederationClientModuleOptions(): Promise<FederationClientModuleOptions> | FederationClientModuleOptions;
}

export interface FederationClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<FederationClientModuleOptions> | FederationClientModuleOptions;
  inject?: any[];
  useClass?: Type<FederationClientModuleOptionsFactory>;
}
