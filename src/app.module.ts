import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/interfaces/database-config.interface';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
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
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
