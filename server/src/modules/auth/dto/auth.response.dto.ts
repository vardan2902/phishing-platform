import { ApiResponseProperty } from "@nestjs/swagger";
import { UserResponseDto } from "src/modules/users/dto/user.response.dto"

export class AuthResponseDto {
    @ApiResponseProperty()
    access_token: string

    @ApiResponseProperty()
    data: UserResponseDto
}