import { registerAs } from '@nestjs/config';

export default registerAs('federation-client', () => ({
  url: process.env.FEDERATION_URL || process.env.FEDERATION_SERVICE_HOST,
  token: process.env.FEDERATION_URL_TOKEN,
  options: {},
}));
