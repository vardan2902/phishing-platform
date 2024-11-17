import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel } from "../../shared/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([UserModel]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
