import { IsEmail, Length } from "class-validator";

export class CreateUserDto{
    @Length(2)
    username: string;
    @Length(3)
    password: string;
    @Length(3)
    retypePassword: string;
    @Length(2)
    firstName: string;
    @IsEmail()
    email: string;
}