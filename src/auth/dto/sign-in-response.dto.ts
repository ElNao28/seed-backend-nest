import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SuccessfullyLoginDto {
  @IsString()
  @ApiProperty()
  accessToken: string;
  @IsString()
  @ApiProperty()
  refreshToken: string;
}
