import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendSmsDto {
  @ApiProperty()
  @IsString()
  destiny: string;

  @ApiProperty()
  @IsString()
  message: string;
}
