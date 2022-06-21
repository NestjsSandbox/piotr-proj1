//* auth.service.ts

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import  * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class AuthService{
    constructor(
        private readonly jwtService: JwtService,
    ){}

    public generateUserToken(user: User): string{

        return this.jwtService.sign({
            username: user.username,
            sub: user.id,
        });
    }


    public async hashPassword(unHashedPassword: string): Promise<string>{
        return await bcrypt.hash(unHashedPassword,10);
    }

}