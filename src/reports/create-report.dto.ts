//* create-report.dto.ts

import { IsString, MinLength,Length } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @MinLength(10)
  name: string;

  @Length(5,20,{message: "Length is out of bounds (only 5 to 20 chars allowed)."})
  @IsString()
  description: string;

  @IsString()
  secretNumber: string;
}
