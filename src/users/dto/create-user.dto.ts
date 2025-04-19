import { CreateAuthorDto } from "@/authors/dto/create-author.dto";
import { CreateCustomerDto } from "@/customers/dto/create-customer.dto";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, Min, MinLength, ValidateNested } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Username is required'})
    username: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email is invalid'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    password: string;

    @ValidateNested()
    @Type(() => CreateCustomerDto)
    customer?: CreateCustomerDto;

    @ValidateNested()
    @Type(() => CreateAuthorDto)
    Author?: CreateAuthorDto[];
}
