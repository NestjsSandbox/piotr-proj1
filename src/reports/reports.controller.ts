import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReportDto } from './create-report.dto';
import { ReportsService } from './reports.service';

@Controller('report')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  getReport(@Param('id') id: string): string {
    return id;
  }

  @Post()
  createReport(@Body() input: CreateReportDto) {
    return this.reportsService.create(input);
  }

  @Patch(':id')
  updateReport(@Param() id: string, @Body() input: CreateReportDto) {
    return input;
  }

  @Delete('id')
  @HttpCode(204) //Status code 204 means "No content"
  deleteReport(@Param('id') id: string) {
    console.log(`Report with id=${id} deleted.`);
  }
}
