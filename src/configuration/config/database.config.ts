import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  DB_NAME: process.env.DB_NAME || 'seed_db',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
}));
