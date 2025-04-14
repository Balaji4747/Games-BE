import { registerAs } from '@nestjs/config';
import * as env from 'env-var';
import { IRedlockClientConfigService } from './configuration.interface';

import { REDLOCK_CLIENT } from './constants';

export default registerAs(REDLOCK_CLIENT, (): IRedlockClientConfigService => {
  const options: IRedlockClientConfigService = {
    retryDelay: env.get('REDLOCK_RETRY_DELAY').default(500).asInt(),
    retryCount: env.get('REDLOCK_RETRY_COUNT').default(81).asInt(),
    ttl: env.get('REDLOCK_TTL').default(5000).asInt(),
  };

  return options;
});
