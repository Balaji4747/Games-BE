import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTConfigService {
  constructor(private readonly configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }

  get validity(): string {
    return this.configService.get<string>('jwt.validity');
  }

  get disableDupJwtCheck(): boolean {
    return this.configService.get<boolean>('jwt.disableDupJwtCheck');
  }

  get adminSecret(): string {
    return this.configService.get<string>('jwt.adminSecret');
  }
}
