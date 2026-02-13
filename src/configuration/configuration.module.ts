import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';
import jwtConf from './config/jwt.config';
import bcryptConf from './config/bcrypt.config';
import emailConf from './config/email.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, jwtConf, bcryptConf, emailConf],
      isGlobal: true,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
