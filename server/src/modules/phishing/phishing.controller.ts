import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendPhishingDto } from './dto/send-phishing.dto';
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { PhishingResponseDto } from './dto/phishing.response.dto';
import { PhishingSuccessResponseDto } from './dto/phishing-success.response.dto';

@ApiTags('Phishing API')
@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) { }

  @Get('attempts')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: PhishingResponseDto, isArray: true })
  getAllAttempts() {
    return this.phishingService.getAllAttempts();
  }

  @Get('click')
  @ApiQuery({ name: 'email' })
  @ApiResponse({ type: PhishingSuccessResponseDto })
  markClick(@Query() query: SendPhishingDto) {
    return this.phishingService.markAttemptAsClicked(query.email);
  }

  @Post('send')
  @ApiResponse({ type: PhishingSuccessResponseDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  sendPhishingEmail(@Body() dto: SendPhishingDto) {
    return this.phishingService.sendPhishingEmail(dto.email);
  }
}
