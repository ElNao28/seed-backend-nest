import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KEY_AUTHORIZATION } from '../decorators/authorization.decorator';
import { JwtAccessPaylodDto } from '../dto/jwt-payload.dto';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      KEY_AUTHORIZATION,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtAccessPaylodDto = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const hasRole = requiredRoles.some((role) =>
      user.roles?.some((userRole) => userRole.name === role),
    );

    if (!hasRole) {
      throw new UnauthorizedException(
        'The user does not have sufficient permissions',
      );
    }

    return true;
  }
}
