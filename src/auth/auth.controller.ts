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
import { AuthService } from './auth.service';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    const token = this.authService.generateUserToken(user);
    return { ...user, token };
  }

  @Post('login')
  @UseGuards(AuthGuard('local-startegy-login'))
  //async login(@Request() request: any) {
  async login(@CurrentUser() user: Partial<User>) {
    return {
      userId: user.id,
      token: this.authService.generateUserToken(user),
    };
  }
}
