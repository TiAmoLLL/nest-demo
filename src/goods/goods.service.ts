import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Goods } from './entities/goods.entity';
import { ReturnType } from '../types/return-type.interface';
@Injectable()
export class GoodsService {

  constructor(
    @InjectRepository(Goods) private readonly goodsRepository: Repository<Goods>,
    // @InjectRepository(Tags) private readonly tag: Repository<Tags>
  ) { }

  create(createGoodsDto: CreateGoodsDto) {
    console.log('添加商品', createGoodsDto);

    return 'This action adds a new good';
  }

  async findAll(query: { account: string; page: number; pageSize: number }): Promise<ReturnType> {
    const { page = 1, pageSize = 20 } = query;

    const goodsQuery = this.goodsRepository.createQueryBuilder('goods');



    const records = await goodsQuery
      .orderBy('goods.goods_id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();


    const total = await goodsQuery.getCount(); // 使用相同的查询条件

    return {
      code: 200,
      message: 'success',
      success: true,
      data: {
        records,
        total,
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} good`;
  }

  update(id: number, updateGoodsDto: UpdateGoodsDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
