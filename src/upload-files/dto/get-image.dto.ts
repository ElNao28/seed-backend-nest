import { ApiProperty } from '@nestjs/swagger';

export class GetImageDto {
  @ApiProperty()
  filePath: string;
}
