import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export const KEY_AUTHORIZATION = 'roles_key';
export enum ROLES {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  User = 'user',
}

export const Authorization = (...roles: ROLES[]) =>
  applyDecorators(
    ApiBearerAuth(),
    SetMetadata(KEY_AUTHORIZATION, roles),
    UseGuards(AuthorizationGuard),
  );
