import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @Type(() => String)
    email: string;
}