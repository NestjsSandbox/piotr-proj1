//* local.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// Step-1 create the LocalStartegy class
@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy,'login-user') {
  // Step-2 wireup a dependency to the database repository
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    // We need to call "super()" method because this class LocalStartegy extends another class PassportStartegy
    super();
  }

  //Step-3 In AuthModule wire up this class and TypeOrm for the User entity

  // Step-4-A create a validate method specific for the Strategy class imported from passport-local (username + password startegy
  public async validate(username: string, password: string): Promise<any> {
    //Step-4-B Implement the validation of the username
    const user = await this.userRepository.findOne({
        where: { username }
    });

    if (!user){
        console.log(`Cannot find user ${username}`);
        throw new UnauthorizedException();
    }

    //Step-4-C Implement the validation of the password
    //! This is temporary do not store password in db
    //TODO Refactor code here to use Bcrypt

    if (user.password !== password) {
        console.log(`Invalid credentials`);
        throw new UnauthorizedException();
    }

    return user;

  }
}
