import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 *
 * @class
 */
@Injectable()
export class InternalConfigService {
  constructor(private readonly configService: ConfigService) {}

  get internalKey(): string {
    return this.configService.get<string>('internal.key');
  }
}
