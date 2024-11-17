import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { EmailModule } from '../../shared/services/smtp/email.module';
import { PhishingModel } from "../../shared/schemas/phishing.schema";

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([PhishingModel]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
