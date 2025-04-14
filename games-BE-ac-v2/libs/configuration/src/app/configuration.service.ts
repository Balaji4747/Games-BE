import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const APP_CONFIG_SERVICE = 'AppConfigService';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('app.name');
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  get isProd(): boolean {
    return this.env === 'production';
  }
}
