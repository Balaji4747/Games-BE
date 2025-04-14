import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export const getAppConfigFromEnv = () => {
  return {
    env: env.get('NODE_ENV').default('production').asString(),
    name: env.get('APP_NAME').required().asString(),
    port: env.get('APP_PORT').required().default(8000).asPortNumber(),
  };
};

export default registerAs('app', getAppConfigFromEnv);
