import { AuthorDetailsDto } from "@/authors/dto/author-details.dto";
import { CustomerDetailsDto } from "@/customers/dto/customer-details.dto";
import { Role } from "@/shared/enums/role.enum";
import { Expose } from "class-transformer";

export class userProfileDto {
    @Expose()
    userName: string;
  
    @Expose()
    email: string;
  
    @Expose()
    role: Role;
  
    @Expose()
    customerDetails?: CustomerDetailsDto;
  
    @Expose()
    authorDetails?: AuthorDetailsDto;
  }