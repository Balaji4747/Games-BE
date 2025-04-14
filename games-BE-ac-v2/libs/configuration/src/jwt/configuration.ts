import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export const getConfigFromEnv = () => {
  return {
    secret: env.get('JWT_SECRET').required().default('p4sta.w1th-b0logn3s3-s@uce').asString(),
    validity: env.get('JWT_VALIDITY').required().default('8h').asString(),
    disableDupJwtCheck: env.get('DISABLE_DUPLICATE_JWT_CHECK').asBool(),
    adminSecret: env.get('ADMIN_JWT_SECRET').default('no_token').asString(),
  };
};

export default registerAs('jwt', getConfigFromEnv);
