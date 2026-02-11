import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTConfig } from '../../configuration/config/interfaces/jwt-config.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly confService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confService.get<JWTConfig>('jwt', { infer: true })
        .SECRET_KEY_ACCESS_TOKEN,
    });
  }
  async validate(payload: any) {
    return payload;
  }
}
