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
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(@Body() body) {}

  @Post('login')
  @UseGuards(AuthGuard('local-startegy-login'))
  //async login(@Request() request: any) {
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.generateUserToken(user),
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt-strategy'))
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
