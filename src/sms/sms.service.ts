import { Injectable } from '@nestjs/common';
import twilio from 'twilio';
import { SendSmsDto } from './dto/send-sms.dto';
import { ConfigService } from '@nestjs/config';
import { TwilioConfig } from '../configuration/config/interfaces/twilio-config.interface';

@Injectable()
export class SmsService {
  private client;
  private _twilioNumber: string;

  constructor(private readonly configService: ConfigService) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } =
      configService.get<TwilioConfig>('twilio')!;
    this._twilioNumber = TWILIO_NUMBER;

    this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }

  public async sendMessage(sendSmsDto: SendSmsDto) {
    const { destiny, message } = sendSmsDto;

    await this.client.messages.create({
      body: message,
      from: this._twilioNumber,
      to: destiny,
    });

    return true;
  }
}
