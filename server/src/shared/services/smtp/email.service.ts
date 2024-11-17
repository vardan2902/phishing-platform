import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from "nodemailer";
import { EMAIL_TRANSPORTER } from "../../constants";

@Injectable()
export class EmailService {
  constructor(@Inject(EMAIL_TRANSPORTER) private readonly transporter: Transporter) {}

  async sendEmail(to: string, emailContent: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: 'Security Team',
        to,
        subject: 'Security Awareness Test',
        html: emailContent,
      });

      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
      throw new Error('Failed to send email');
    }
  }
}
