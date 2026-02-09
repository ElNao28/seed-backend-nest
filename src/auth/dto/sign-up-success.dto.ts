import { BaseResponse } from 'src/common/utils/base-response';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpSuccessDto extends BaseResponse {
  @ApiProperty()
  data: {};
}
