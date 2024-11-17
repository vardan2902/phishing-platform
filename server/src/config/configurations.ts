import { isProduction } from "./constants";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import * as process from "node:process";

export default () => ({
  node: {
    env: process.env.NODE_ENV || 'development',
  },
  baseUrl: process.env.BASE_URL || 'http://localhost:4000',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'super secret',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES || '7d',
    },
  },
  mongodb: {
    url: process.env.DATABASE_URL
  },
  smtp: {
    transporter:  {
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: isProduction,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    from: process.env.EMAIL_USER,
  } as SMTPTransport.Options,
});
