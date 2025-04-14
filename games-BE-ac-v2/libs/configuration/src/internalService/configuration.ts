import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export const getConfigFromEnv = () => {
  return {
    key: env.get('INTERNAL_KEY').asString(),
    ip: env.get('INTERNAL_IP').asString(),
  };
};

export default registerAs('internal', getConfigFromEnv);
