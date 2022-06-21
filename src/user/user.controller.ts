import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('user')
export class UserController {

 
  @Get()
  @UseGuards(AuthGuard('jwt-strategy'))
  async getUser(@CurrentUser() user: User) {
    return user;
  }

}
