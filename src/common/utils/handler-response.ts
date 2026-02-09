import { ApiProperty } from '@nestjs/swagger';

export class HandlerResponse<T> {
  @ApiProperty()
  data?: T;
  @ApiProperty()
  message: string;
  @ApiProperty()
  error?: string;

  constructor(message: string, error?: string, data?: T) {
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static response<T>(message: string = 'Succefully', error?: string, data?: T) {
    return new HandlerResponse<T>(message, error, data);
  }
}
