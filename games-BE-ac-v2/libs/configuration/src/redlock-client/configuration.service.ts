import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRedlockClientConfigService } from './configuration.interface';
import { REDLOCK_CLIENT } from './constants';

@Injectable()
export class RedlockClientConfigService {
  constructor(private configService: ConfigService) {}

  get redlock(): IRedlockClientConfigService {
    return this.configService.get(REDLOCK_CLIENT);
  }
}
