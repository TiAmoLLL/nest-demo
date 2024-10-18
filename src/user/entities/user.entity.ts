import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class User {
    //自增列
    @PrimaryGeneratedColumn()
    id?: number;

    // UUID 列
    // UUID 列
    @Column({ type: 'uuid', unique: true })
    uuid?: string;
    //普通列
    // 账号
    @Column()
    account: string
    // 密码
    @Column()
    password: string

    @Column()
    username: string

    @Column()
    role: string

    constructor(account: string, password: string, username: string, role: string) {
        this.account = account;
        this.password = password;
        this.username = username;
        this.role = role;
        this.generateUuid(); // 生成 UUID
    }

    @BeforeInsert()
    private generateUuid() {
        this.uuid = uuidv4(); // 在插入之前生成 UUID
    }
}
