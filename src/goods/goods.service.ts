import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createGoodsDto: CreateGoodsDto): Promise<ReturnType> {
    console.log('添加商品', createGoodsDto);
    const existingGoods = await this.goodsRepository.findOne({
      where: { goods_name: createGoodsDto.goods_name }
    });
    if (existingGoods) {
      return {
        code: 500,
        message: '已存在该商品',
        success: false,
        data: "已存在该商品"
      }
    }
    const goods = this.goodsRepository.create(createGoodsDto);

    try {
      const savedGoods = await this.goodsRepository.save(goods);
      console.log('保存成功:', savedGoods);
      return {
        code: 200,
        message: '商品保存成功',
        success: true,
        data: "商品保存成功"
      }
    } catch (error) {
      console.error('保存失败:', error);
      return {
        code: 500,
        message: '商品保存失败',
        success: false,
        data: "商品保存失败"
      }
    }
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

  async update(updateGoodsDto: UpdateGoodsDto): Promise<ReturnType> {
    console.log('update', updateGoodsDto)
    const data = await this.goodsRepository.findOne({ where: { goods_id: updateGoodsDto.goods_id } });
    if (!data) {
      throw new HttpException({
        code: 404,
        message: '商品不存在',
        success: false,
        data: "商品不存在",
      }, HttpStatus.NOT_FOUND); // 返回 404 状态码
    }
    Object.assign(data, updateGoodsDto)
    try {
      const goods = await this.goodsRepository.save(data);
      return {
        code: 200,
        message: '商品更新成功',
        success: true,
        data: goods,
      };
    } catch (err) {
      return {
        code: 500,
        message: '商品更新失败',
        success: false,
        data: '商品更新失败',
      };
    }
  }

  async remove(id: number): Promise<ReturnType> {
    console.log('删除商品', id);

    const data = await this.goodsRepository.findOne({ where: { goods_id: id } });
    console.log(data);

    if (!data) {
      throw new HttpException({
        code: 404,
        message: '商品不存在',
        success: false,
        data: "商品不存在",
      }, HttpStatus.NOT_FOUND); // 返回 404 状态码
    }
    try {
      // 删除
      const removeData = await this.goodsRepository.remove(data);
      return {
        code: 200,
        message: 'success',
        success: true,
        data: "删除商品成功"
      } // 返回保存后的数据
    } catch (error) {
      return {
        code: 500,
        message: 'error',
        success: false,
        data: "删除商品失败"
      }
    }
  }
}
