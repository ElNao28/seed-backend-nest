import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../guards/authorization.guard';

export const KEY_AUTHORIZATION = 'roles_key';
export enum ROLES {
  SuperAdmin = 'super_admin',
  Admin = 'admin',
  User = 'user',
}

export const Authorization = (...roles: ROLES[]) =>
  applyDecorators(
    SetMetadata(KEY_AUTHORIZATION, roles),
    UseGuards(AuthorizationGuard),
  );
