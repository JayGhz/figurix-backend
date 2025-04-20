import { User } from "@/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('authors')
export class Author {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    bio: string;

    @Column()
    country: string;

    @Column()
    followers: number;

    @OneToOne(() => User, (user) => user.author)
    @JoinColumn()
    user: User;
}
