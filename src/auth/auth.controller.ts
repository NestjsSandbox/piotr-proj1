//* auth.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() body) {
    const user = this.userRepository.create({
      username: body.username,
      password: body.password,
      email: 'lala',
    });
    return await this.userRepository.save(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('login-user'))
  async login(@Request() request: any) {
    return {
      userId: request.user.id,
      token: this.authService.generateUserToken(request.user),
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt-strategy'))
  async getUser(@Request() request){
    return request.user;
  }
}
