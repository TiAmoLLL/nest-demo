import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Guard {
    //自增列
    @PrimaryGeneratedColumn()
    id: number
    //普通列
    @Column()
    name: string
}
