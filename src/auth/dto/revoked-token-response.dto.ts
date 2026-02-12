import { ApiProperty } from '@nestjs/swagger';

export class RevokedTokenResponseDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  status: number;
}
