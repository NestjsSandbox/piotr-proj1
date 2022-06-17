import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [],
  controllers: [AppController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
