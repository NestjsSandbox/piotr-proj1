//* auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './startegy/jwt.startegy';
import { LocalStartegy } from './startegy/local.startegy';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
      useFactory: () => ({
        //when Async then need useFactory
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '60m', // Another option is 3600 number
        },
      }),
    }),
  ],
  providers: [LocalStartegy, JwtStrategy, AuthService],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
