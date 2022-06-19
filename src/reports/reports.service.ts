import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repo: Repository<Report>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async create(reportDto: CreateReportDto) {
    const report = this.repo.create(reportDto);
    return await this.repo.save(report);
  }
}
