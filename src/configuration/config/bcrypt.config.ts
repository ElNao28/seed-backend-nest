import { registerAs } from '@nestjs/config';

export default registerAs('bcrypt', () => ({
  ROUNDS_HASH: process.env.ROUNDS_HASH || 8,
  ROUNDS_TOKEN_HASH: process.env.ROUNDS_TOKEN_HASH || 10,
}));
