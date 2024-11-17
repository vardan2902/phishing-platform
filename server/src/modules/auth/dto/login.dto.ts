import { IsNotEmpty, IsStrongPassword, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { AuthDto } from './auth.dto';

export class LoginDto extends AuthDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  }, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
  @IsNotEmpty()
  password: string;
}