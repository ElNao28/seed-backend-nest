import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshToken } from './entities/refreshToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, RefreshToken])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [TypeOrmModule],
})
export class AuthModule {}
