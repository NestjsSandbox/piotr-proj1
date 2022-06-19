//* app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'piotr-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
