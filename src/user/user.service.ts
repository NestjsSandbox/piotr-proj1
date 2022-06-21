import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {

    public async createUser(user: User ): Promise<User>{

        // const user = this.userRepository.create({
        //     username: body.username,
        //     password: body.password,
        //     email: 'lala',
        //   });
        //   return await this.userRepository.save(user);
        return user;
    }


}
