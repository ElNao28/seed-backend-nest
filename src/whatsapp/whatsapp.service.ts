import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Client } from 'whatsapp-web.js';
import QRcode from 'qrcode';
import { Response } from 'express';
import { SendWhatsappMessageDto } from './dto/send-whatsapp-message.dto';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client = new Client({});

  constructor(private readonly eventEmitter: EventEmitter2) {}

  onModuleInit() {
    // console.log('Uncomment to enable whabot');
    
    this.client.on('qr', (qr) => {
      this.eventEmitter.emit('order.created', qr);
    });

    this.client.on('ready', () => {
      console.log('Whatsapp bot ready');
    });

    // Event to listen messages
    this.client.on('message', (message) => {
      console.log(message.body);
    });

    this.client.initialize();
    
  }

  public async generateWhatsappQr(code: string, response: Response) {
    response.setHeader('Content-Type', 'image/png');
    QRcode.toFileStream(response, code);
  }

  async sendWhatsappMessage(sendWhatsappMessageDto: SendWhatsappMessageDto) {
    const { destiny, message } = sendWhatsappMessageDto;
    // TODO: Include country code -> 521+789*******
    const formattedNumber = `${destiny}@c.us`;
    return this.client.sendMessage(formattedNumber, message);
  }
}
