import { User } from "@/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity("customers")
export class Customer {
    @Column({ primary: true, generated: true })
    id: number
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    adress: string;

    @OneToOne(() => User, (user) => user.customer)
    @JoinColumn()
    user: User;
}
