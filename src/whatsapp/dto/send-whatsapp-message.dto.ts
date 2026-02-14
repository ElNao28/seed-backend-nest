import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendWhatsappMessageDto {
  @ApiProperty()
  @IsString()
  destiny: string;

  @ApiProperty()
  @IsString()
  message: string;
}
