import { IsNotEmpty } from "class-validator";

export class CreateAuthorDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @IsNotEmpty({ message: 'Bio is required' })
    bio: string;

    @IsNotEmpty({ message: 'Country is required' })
    country: string;
}
