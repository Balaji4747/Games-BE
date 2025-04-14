import { ExceptionFilter, PipeTransform } from '@nestjs/common';
import { FrameworkEnum } from './framework.enum';

export interface IBootstrapOptions {
  readonly framework: FrameworkEnum;
  readonly AppModule: any;
  readonly middlewares?: any[];
  readonly pipes?: PipeTransform<any>[];
  readonly filters?: ExceptionFilter[];
  readonly factoryOptions?: Record<string, any>;
  readonly enableWebSockets?: boolean;
  readonly startMicroservices?: boolean;
}
