//* auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { LocalStartegy } from './local.startegy';
import { User } from './user.entity';

@Module({
   imports: [ TypeOrmModule.forFeature([User])],
   providers: [LocalStartegy],
   controllers: [AuthController]
})
export class AuthModule {}
