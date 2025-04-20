import { Role } from "@/shared/enums/role.enum";
import { Expose } from "class-transformer";

export class UserDetailsDto {
    @Expose()
    id: number;

    @Expose()
    userName: string;

    @Expose()
    email: string;

    @Expose()
    role: Role;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}