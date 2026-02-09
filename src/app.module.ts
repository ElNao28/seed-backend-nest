import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database.config';
import jwtConf from './config/jwt.config';
import bcryptConf from './config/bcrypt.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/interfaces/database-config.interface';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database, jwtConf, bcryptConf],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } =
          configService.get<DatabaseConfig>('database')!;
        return {
          type: 'postgres',
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
