import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { OnEvent } from '@nestjs/event-emitter';
import { SendWhatsappMessageDto } from './dto/send-whatsapp-message.dto';
import { Authorization } from '../auth/decorators/authorization.decorator';
import { ApiAcceptedResponse } from '@nestjs/swagger';

@Controller('whatsapp')
export class WhatsappController {
  private qrCode: string;

  constructor(private readonly whatsappService: WhatsappService) {}

  @OnEvent('order.created')
  public handlerToCreateQr(paylod: string) {
    this.qrCode = paylod;
  }

  @Authorization()
  @Get('generate-qr')
  public generateWhatsappQr(@Res() response: any) {
    return this.whatsappService.generateWhatsappQr(this.qrCode, response);
  }

  @Authorization()
  @ApiAcceptedResponse({
    description: 'Message send',
  })
  @Post('send-message')
  public sendWhatsappMessage(
    @Body() sendWhatsappMessageDto: SendWhatsappMessageDto,
  ) {
    return this.whatsappService.sendWhatsappMessage(sendWhatsappMessageDto);
  }
}
