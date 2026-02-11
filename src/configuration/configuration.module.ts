import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import database from './config/database.config';
import jwtConf from './config/jwt.config';
import bcryptConf from './config/bcrypt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, jwtConf, bcryptConf],
      isGlobal: true,
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
