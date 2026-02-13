import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendEmailTestDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsEmail()
  destination: string;
}
