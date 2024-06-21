import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private twilioClient: Twilio;

  constructor() {
    this.twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async handleIncomingMessage(body: any) {
    const { From, Body, MediaUrl0 } = body;

    // Process the incoming message
    if (Body) {
      console.log(`Received text message from ${From}: ${Body}`);
    }

    if (MediaUrl0) {
      const mediaUrl = MediaUrl0;
      console.log(`Received media message from ${From}: ${mediaUrl}`);
      // You can download and process the media if needed
    }

    // Implement any additional logic, such as saving the message to a database
  }

  async sendMessage(to: string, message: string) {
    try {
      const response = await this.twilioClient.messages.create({
        body: message,
        from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
        to: 'whatsapp:' + to,
      });

      console.log(`Message sent: ${response.sid}`);
    } catch (error) {
      console.error(`Error sending message: ${error.message}`);
      throw new Error('Failed to send message');
    }
  }
}
