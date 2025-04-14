import { registerAs } from '@nestjs/config';
import { IRedisClientConfigService } from './configuration.interface';

export default registerAs('redis-client', (): IRedisClientConfigService => {
  const options: IRedisClientConfigService = {
    name: process.env.REDIS_NAME_MASTER,
    password: process.env.REDIS_PASSWORD,
    db: Number(process.env.REDIS_DB) || 0,
    keyPrefix: process.env.REDIS_KEY_PREFIX,
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME || 'default',
  };

  return options;
});
