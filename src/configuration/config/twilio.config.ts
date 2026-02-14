import { registerAs } from '@nestjs/config';

export default registerAs('twilio', () => ({
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_NUMBER: process.env.TWILIO_NUMBER || '',
}));
