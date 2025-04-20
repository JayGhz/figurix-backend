import { Customer } from "@/customers/entities/customer.entity";
import { Role } from "@/shared/enums/role.enum";
import { Column, Entity, OneToOne } from "typeorm";

@Entity('users')
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    userName: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'enum', enum: Role })
    role: Role;

    @Column()
    password: string;
    
    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @OneToOne(() => Customer, (customer) => customer.user, { cascade: true, onDelete: 'CASCADE' })
    customer?: Customer;

    @OneToOne(() => Customer, (customer) => customer.user, { cascade: true, onDelete: 'CASCADE' })
    author?: Customer;
}
