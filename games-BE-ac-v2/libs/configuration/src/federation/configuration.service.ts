import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const FEDERATION_CONFIG_SERVICE = 'FederationConfigService';

@Injectable()
export class FederationConfigService {
  constructor(private readonly configService: ConfigService) {}

  get players(): any {
    return this.configService.get('federation.players');
  }

  get aviatorx(): any {
    return this.configService.get('federation.aviatorx');
  }

  get management(): any {
    return this.configService.get('federation.management');
  }

  get crash(): any {
    return this.configService.get('federation.crash');
  }

  get slide(): any {
    return this.configService.get('federation.slide');
  }

  get dice(): any {
    return this.configService.get('federation.dice');
  }

  get plinko(): any {
    return this.configService.get('federation.plinko');
  }

  get limbo(): any {
    return this.configService.get('federation.limbo');
  }

  get diamond(): any {
    return this.configService.get('federation.diamond');
  }

  get hilo(): any {
    return this.configService.get('federation.hilo');
  }

  get mines(): any {
    return this.configService.get('federation.mines');
  }

  get pcrash(): any {
    return this.configService.get('federation.pcrash');
  }

  get buttonpop(): any {
    return this.configService.get('federation.buttonpop');
  }

  get bottlesmash(): any {
    return this.configService.get('federation.bottlesmash');
  }

  get overandout(): any {
    return this.configService.get('federation.overandout');
  }
}
