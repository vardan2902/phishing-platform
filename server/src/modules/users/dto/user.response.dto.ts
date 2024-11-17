import { ApiResponseProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  fullName: string;
}
