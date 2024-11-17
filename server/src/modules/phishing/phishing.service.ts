import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from "class-transformer";
import { Model } from 'mongoose';
import { EmailService } from '../../shared/services/smtp/email.service';
import { Phishing, PhishingDoc, PhishingStatuses } from "../../shared/schemas/phishing.schema";
import { PhishingResponseDto } from './dto/phishing.response.dto';
import { PhishingSuccessResponseDto } from './dto/phishing-success.response.dto';
import { buildContent, buildUrl } from 'src/shared/helpers/phishing.helper';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(Phishing.name)
    private readonly phishingModel: Model<PhishingDoc>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
  }

  async getAllAttempts(): Promise<PhishingResponseDto[]> {
    const phishings = await this.phishingModel.aggregate([
      {
        $project: {
          id: '$_id',
          content: 1,
          email: 1,
          status: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return plainToInstance(PhishingResponseDto, phishings)
  }

  async markAttemptAsClicked(email: string): Promise<PhishingSuccessResponseDto> {
    const attempt = await this.phishingModel.findOne({
      email,
      status: PhishingStatuses.PENDING,
    });

    if (!attempt) throw new BadRequestException('No pending phishing attempt found');


    await this.phishingModel.updateOne({
      email,
      status: PhishingStatuses.PENDING,
    }, {
      status: PhishingStatuses.CLICKED
    });

    return { success: true }
  }

  async sendPhishingEmail(email: string): Promise<PhishingSuccessResponseDto> {
    const existingPhishingAttempt = await this.phishingModel
      .findOne({ email })
      .exec();

    if (existingPhishingAttempt) throw new BadRequestException('Phishing email already sent');

    const url = buildUrl(this.configService.get<string>('baseUrl'), email);
    const content = buildContent(url);

    await this.emailService.sendEmail(email, content);

    const newPhishingAttempt = new this.phishingModel({
      email,
      status: PhishingStatuses.PENDING,
      content,
    });
    await newPhishingAttempt.save();

    return { success: true }
  }
}
