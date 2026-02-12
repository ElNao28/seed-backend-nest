import { ApiProperty } from '@nestjs/swagger';

export class GenerateAccessTokenResponseDto {
  @ApiProperty()
  accessToken: string;
}
