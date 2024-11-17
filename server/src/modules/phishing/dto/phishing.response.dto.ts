import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class PhishingResponseDto {
  @ApiResponseProperty()
  @Expose()
  id: string;

  @ApiResponseProperty()
  @Expose()
  email: string;

  @ApiResponseProperty()
  @Expose()
  content: string;

  @ApiResponseProperty()
  @Expose()
  status: string;
}
