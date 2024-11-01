import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Goods } from './entities/goods.entity';
import { ApiOperation } from '@nestjs/swagger';
import { ReturnType } from '../types/return-type.interface';
@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) { }

  @ApiOperation({ summary: "创建商品" })
  @Post('create')
  @HttpCode(200)
  async create(@Body() createGoodsDto: CreateGoodsDto) {
    const result = await this.goodsService.create(createGoodsDto);
    return result
  }

  @ApiOperation({ summary: "获取所有商品" })
  @Get('findAll')
  @HttpCode(200)
  async findAll(@Query() query): Promise<ReturnType> {
    // console.log(await this.userService.findAll(query))
    console.log('获取用户', query)
    // return this.userService.findAll();
    const result = await this.goodsService.findAll(query);
    return result
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodsDto: UpdateGoodsDto) {
    return this.goodsService.update(+id, updateGoodsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goodsService.remove(+id);
  }
}
