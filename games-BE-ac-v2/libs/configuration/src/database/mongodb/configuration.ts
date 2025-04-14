import { registerAs } from '@nestjs/config';
import { IMongoConnectionOptions } from '@provfair/shared/interfaces/IMongoConnectionOptions';
import * as env from 'env-var';

export default registerAs(
  'database.mongodb',
  (): IMongoConnectionOptions => ({
    uri: env.get('MONGODB_URI').required(true).asString(),
  }),
);
