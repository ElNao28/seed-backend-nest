import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class RevokeRefreshTokenDto {
  @ApiProperty()
  @IsString()
  oldToken: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  userId: string;
}
