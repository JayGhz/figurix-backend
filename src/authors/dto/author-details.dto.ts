import { Expose } from "class-transformer";

export class AuthorDetailsDto {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    bio: string;

    @Expose()
    country: string;

    @Expose()
    followers: number
}