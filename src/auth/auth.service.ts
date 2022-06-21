//* auth.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public generateUserToken(user: Partial<User>): string {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id,
    });
  }

  public async hashPassword(unHashedPassword: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(unHashedPassword, 10);
      return encryptedPassword;
  }

  public async createUser(userApplyInfo: CreateUserDto): Promise<User> {
    //const user = new User;
    const { username, password, retypePassword, firstName, email } =
      userApplyInfo;

    if (password !== retypePassword) {
      throw new BadRequestException(['Passwords do not match.']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      throw new BadRequestException(['username or email already exist in db.']);
    }

    const user = {
      username: username,
      password: await this.hashPassword(password),
      firstName: firstName,
      email: email,
    };

    this.userRepository.create(user);
    return await this.userRepository.save(user);
  }
}
