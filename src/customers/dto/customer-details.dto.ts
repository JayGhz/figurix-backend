import { Expose } from "class-transformer";

export class CustomerDetailsDto {
    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    adress: string;

    @Expose()
    phone: string;
}