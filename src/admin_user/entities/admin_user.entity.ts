import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class AdminUser {
    //自增列
    @PrimaryGeneratedColumn({ comment: 'id' })
    id?: number;

    // UUID 列
    // UUID 列
    @Column({ type: 'uuid', unique: true, comment: "uuid" })
    uuid?: string;
    //普通列
    // 账号
    @Column({ comment: '账号' })
    account: string
    // 密码
    @Column({ comment: '密码' })
    password: string

    @Column({ comment: '用户名' })
    username: string

    @Column({ comment: '角色' })
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
