import nodemailer, { Transporter } from 'nodemailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailConfig } from '../configuration/config/interfaces/email-config.interface';
import { SendEmailTestDto } from './dto/send-email-test.dto';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    const { EMAIL, EMAIL_PASSWORD } = configService.get<EmailConfig>('email')!;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  public async testSendEmail(sendEmailTestDto: SendEmailTestDto) {
    const isSend = await this.sendEmail(sendEmailTestDto);

    if (!isSend) throw new ConflictException();
    return {
      message: 'Email send',
    };
  }

  public async sendEmail(sendEmailTestDto: SendEmailTestDto) {
    const { destination, message } = sendEmailTestDto;
    const payload = {
      to: destination,
      from: 'Seed nestJS',
      subject: 'Hello world',
      html: `
      <h1>HI, from seed NestJS</h1>
      <p>${message}</p>
      `,
    };

    try {
      await this.transporter.sendMail(payload);
      return true;
    } catch (error) {
      return false;
    }
  }
}
