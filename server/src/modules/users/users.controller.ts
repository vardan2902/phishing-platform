import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user.response.dto';
import { User } from "../../shared/schemas/user.schema";
import { CurrentUser } from "../../shared/decorators/user.decorator";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";

@ApiTags('User API')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  @ApiResponse({ type: UserResponseDto })
  getProfile(@CurrentUser() user: User): Promise<UserResponseDto> {
    return this.usersService.getProfile(user.email);
  }
}
