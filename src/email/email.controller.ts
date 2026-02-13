import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailTestDto } from './dto/send-email-test.dto';
import {
  Authorization,
  ROLES,
} from '../auth/decorators/authorization.decorator';
import { ApiAcceptedResponse } from '@nestjs/swagger';
import { SendEmailTestResponseDto } from './dto/send-email-test-response';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiAcceptedResponse({
    description: 'Email send',
    type: SendEmailTestResponseDto,
  })
  @Authorization(ROLES.SuperAdmin, ROLES.Admin)
  @Post('test-email')
  public sendTestEmail(@Body() sendEmailTestDto: SendEmailTestDto) {
    return this.emailService.testSendEmail(sendEmailTestDto);
  }
}
