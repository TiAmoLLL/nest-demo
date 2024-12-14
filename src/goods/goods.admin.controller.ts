import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, Put } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { UpdateGoodsDto } from './dto/update-goods.dto';
import { Goods } from './entities/goods.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnType } from '../types/return-type.interface';
@ApiTags("goods") //添加api注释
@Controller('admin/goods')
export class GoodsAdminController {
  constructor(private readonly goodsService: GoodsService) { }

  @ApiOperation({ summary: "创建商品" })
  @Post('create')
  @HttpCode(200)
  async create(@Body() createGoodsDto: CreateGoodsDto): Promise<ReturnType> {
    const result = await this.goodsService.create(createGoodsDto);
    return result
  }

  // @ApiOperation({ summary: "获取所有商品" })
  // @Get('findAll')
  // @HttpCode(200)
  // async findAll(@Query() query): Promise<ReturnType> {
  //   // console.log(await this.userService.findAll(query))
  //   console.log('获取用户', query)
  //   // return this.userService.findAll();
  //   const result = await this.goodsService.findAll(query);
  //   return result
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.goodsService.findOne(+id);
  // }

  @ApiOperation({ summary: "修改信息" })
  @Put('update')
  @HttpCode(200)
  async update(@Body() updateGoodsDto: UpdateGoodsDto): Promise<ReturnType> {
    let result = await this.goodsService.update(updateGoodsDto);
    return result
  }

  @ApiOperation({ summary: "删除商品" })
  @Delete('delete/:id')
  @HttpCode(200)
  async remove(@Param('id') id: number) {
    const result = await this.goodsService.remove(id);
    return result
  }
}
