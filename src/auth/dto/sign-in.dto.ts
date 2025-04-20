import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignInDto {
    
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}