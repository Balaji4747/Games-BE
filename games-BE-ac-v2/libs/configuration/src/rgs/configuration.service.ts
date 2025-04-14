import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RGSConfigService {
  constructor(private readonly configService: ConfigService) {}

  get url() {
    return this.configService.get<string>('rgs.url');
  }
}
