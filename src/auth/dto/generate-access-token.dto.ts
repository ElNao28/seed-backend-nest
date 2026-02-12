import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenerateAccessToken {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
