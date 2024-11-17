import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from "./dto/login.dto";
import { UserDoc, User } from "../../shared/schemas/user.schema";
import { UserResponseDto } from '../users/dto/user.response.dto';
import { AuthResponseDto } from './dto/auth.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string): Promise<User> | never {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException();

    return user;
  }

  async register(
    signUpDto: SignUpDto,
  ): Promise<AuthResponseDto> {
    const user = await this.userModel.findOne({ email: signUpDto.email });

    if (user) throw new BadRequestException("User is already registered.");

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    const newUser = new this.userModel({
      email: signUpDto.email,
      password: hashedPassword,
      fullName: signUpDto.fullName,
    });
    await newUser.save();

    return this.getAuthenticatedUser(newUser);
  }

  async login({ email, password }: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new UnauthorizedException();

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new BadRequestException('Incorrect credentials.');
    }

    return this.getAuthenticatedUser(user);
  }

  private getAuthenticatedUser(user: User) {
    const data = {
      email: user.email,
      fullName: user.fullName,
      id: user.id
    };
    return {
      access_token: this.generateToken(data),
      data
    }
  }

  private generateToken(user: UserResponseDto): string {
    return this.jwtService.sign(
      user,
      { secret: this.configService.get<string>('jwt.secret') },
    )
  }
}
