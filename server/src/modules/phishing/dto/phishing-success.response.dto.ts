import { ApiResponseProperty } from "@nestjs/swagger";

export class PhishingSuccessResponseDto {
    @ApiResponseProperty()
    success: boolean
}