import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Goods {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    goods_id?: number;


    @Column({ length: 100, comment: '商品名称，最长100个字符' })
    goods_name?: string;

    @Column('decimal', { precision: 10, scale: 2, comment: '商品价格，最多10位整数，2位小数' })
    goods_price?: number;

    @Column({ type: 'text', nullable: true, comment: '商品描述，最长65535个字符' })
    goods_description?: string;

    @Column({
        type: 'json',
        nullable: true,
        comment: '商品图片列表，JSON 格式存储',
    })
    goods_image?: { fileName: string; url: string; size: number }[];

    @Column({ type: 'int', default: 0, comment: '商品库存数量，默认为0' })
    goods_quantity?: number;

    @Column({ length: 50, comment: '商品品牌，最长50个字符' })
    goods_category?: string;

    @Column({ type: 'enum', enum: ['available', 'unavailable', 'out_of_stock', 'discontinued'], default: 'available', comment: '商品状态，可选值为available、unavailable、out_of_stock、discontinued' })
    //available 正常 unavailable 停用 out_of_stock 库存不足 discontinued 停产 
    goods_status?: string;

    @Column({ type: 'timestamp', comment: '商品创建时间' })
    goods_created_at?: Date;

    // 在插入之前自动设置创建时间
    @BeforeInsert()
    setCreationDate() {
        this.goods_created_at = new Date();
    }
}
