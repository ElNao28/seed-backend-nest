import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  SECRET_KEY_REFRESH_TOKEN:
    process.env.SECRET_KEY_REFRESH_TOKEN || 'seedKeyRef123*',
  SECRET_KEY_ACCESS_TOKEN:
    process.env.SECRET_KEY_ACCESS_TOKEN || 'seedKeyAcc123*',
  EXPIRATION_TIME: process.env.EXPIRATION_TIME || '7d',
}));
