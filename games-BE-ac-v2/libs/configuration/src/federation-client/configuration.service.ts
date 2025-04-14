import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const FEDERATION_CONFIG_SERVICE = 'FederationClientConfigService';

@Injectable()
export class FederationClientConfigService {
  constructor(private configService: ConfigService) {}

  get url() {
    return this.configService.get('federation-client.url');
  }

  get token(): any {
    return this.configService.get('federation-client.token');
  }
}
