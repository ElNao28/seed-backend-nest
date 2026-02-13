import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  EMAIL: process.env.EMAIL || 'seed@email.com',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'app_password',
}));
