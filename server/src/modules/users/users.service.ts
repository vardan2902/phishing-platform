import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from "class-transformer";
import { User, UserDoc } from "../../shared/schemas/user.schema";
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
  ) {
  }

  async getProfile(email: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ email });

    return {
      fullName: user.fullName,
      email: user.email,
      id: user.id
    }
  }
}
