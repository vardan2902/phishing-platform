import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { EMAIL_TRANSPORTER } from "../../constants";

@Module({
  providers: [
    {
      provide: EMAIL_TRANSPORTER,
      useFactory: async (configService: ConfigService) => {
        return nodemailer.createTransport(
          configService.get<SMTPTransport.Options>('smtp.transporter')
        );
      },
      inject: [ConfigService],
    },
    EmailService
  ],
  exports: [EmailService],
})
export class EmailModule {}
