import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SendSmsDto } from './dto/send-sms.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Authorization()
  @Post('send')
  public sendMessage(@Body() sendSmsDto: SendSmsDto) {
    return this.smsService.sendMessage(sendSmsDto);
  }
}
