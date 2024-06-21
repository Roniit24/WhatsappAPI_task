import { Controller, Post, Body, Res } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Response } from 'express';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('receive')
  async receiveMessage(@Body() body, @Res() res: Response) {
    try {
      await this.whatsappService.handleIncomingMessage(body);
      res.status(200).send({ message: 'Message received' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  @Post('send')
  async sendMessage(@Body() body, @Res() res: Response) {
    try {
      const { to, message } = body;
      await this.whatsappService.sendMessage(to, message);
      res.status(200).send({ message: 'Message sent' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
