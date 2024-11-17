import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SendPhishingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @IsEmail({}, { message: 'Invalid recipient email format' })
  email: string;
}
