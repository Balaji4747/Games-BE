import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMongoConnectionOptions } from '@provfair/shared/interfaces/IMongoConnectionOptions';

/**
 * Service dealing with MongoDB database config based operations.
 *
 * @class
 */
@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get mongodb(): IMongoConnectionOptions {
    return this.configService.get<IMongoConnectionOptions>('database.mongodb');
  }
}
