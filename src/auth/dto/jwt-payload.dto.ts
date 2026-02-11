import { Role } from '../entities/role.entity';

export class JwtAccessPaylodDto {
  sub: string;
  email: string;
  roles: Role[];
}
