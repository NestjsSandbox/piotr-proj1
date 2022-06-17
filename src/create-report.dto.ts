//* create-report.dto.ts

import { IsString, MinLength, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @MinLength(10)
  name: string;

  @IsString()
  description: string;

  @IsString()
  secretKey: string;

}
