//* app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormProdConfig from './config/orm-prod.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [ormConfig, ormProdConfig], //Do we need to load ormProdConfig also ?
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormProdConfig,
    }),
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
