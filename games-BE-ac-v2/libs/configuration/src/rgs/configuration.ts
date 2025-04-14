import { registerAs } from '@nestjs/config';
import * as env from 'env-var';

export default registerAs('rgs', () => ({
  url: env.get('RGS_URL').required().asString(),
}));
