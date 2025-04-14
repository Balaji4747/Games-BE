import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export const getLoggerConfigFromEnv = () => {
  return {
    appLogLevel: env.get('LOG_LEVEL_APP').default('info').asString(),
    appMaxDepth: env.get('LOG_APP_MAX_DEPTH').default(10).asInt(),
  };
};

export default registerAs('logger', getLoggerConfigFromEnv);
