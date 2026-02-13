import { ApiProperty } from '@nestjs/swagger';

export class SendEmailTestResponseDto {
  @ApiProperty()
  message: string;
}
