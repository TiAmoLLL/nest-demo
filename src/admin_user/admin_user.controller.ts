import { Controller, Get, Post, Body, Param, Delete, Req, Query, HttpCode, UseGuards, Put, } from '@nestjs/common';
import { AdminUserService } from './admin_user.service';
import { CreateAdminUserDto } from './dto/create-admin_user.dto';
import { UpdateAdminUserDto } from './dto/update-admin_user.dto';
import * as svgCaptcha from 'svg-captcha'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminUser } from './entities/admin_user.entity';
import { ReturnType } from '../types/return-type.interface';
// 登录集成到user中
@ApiTags("admin_user") //添加api注释
@Controller('admin_user')
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) { }


  @ApiOperation({ summary: "info" }) // 使用@ApiOperation装饰器为每个请求方法添加描述，提高文档的可读性：
  @UseGuards(JwtAuthGuard) // 使用 JWT 守卫(jwt保护)
  @Get('info')
  getInfo(@Req() req) {
    return {
      code: 200,
      message: 'success',
      success: true,
    }
  }



  @ApiOperation({ summary: "添加用户" })
  @Post('create')
  @HttpCode(200)
  async create(@Body() createUserDto: CreateAdminUserDto): Promise<ReturnType> {
    console.log('添加用户');
    console.log(createUserDto)
    const result = await this.userService.create(createUserDto);
    return result
  }


  @ApiOperation({ summary: "删除用户" })
  @Delete('delete/:id')
  @HttpCode(200)
  async remove(@Param('id') id: number): Promise<ReturnType> {
    console.log('接收到的删除请求，用户 ID:', id);

    // 调用 service 的 delete 方法来删除用户
    const result = await this.userService.remove(id);

    // 返回结果
    return result
  }


  @ApiOperation({ summary: "获取用户" })
  @Get('findAll')
  @HttpCode(200)
  async findAll(@Query() query): Promise<ReturnType> {
    // console.log(await this.userService.findAll(query))
    console.log('获取用户', query)
    // return this.userService.findAll();
    const result = await this.userService.findAll(query);

    // 返回结果
    return result
  }


  @ApiOperation({ summary: "修改用户信息" })
  @Put('update')
  @HttpCode(200)
  async update(@Body() updateUserDto: UpdateAdminUserDto): Promise<ReturnType> {
    // return this.userService.update(+id, updateUserDto);
    console.log('修改用户信息');

    console.log(updateUserDto)
    const result = this.userService.update(updateUserDto)
    return result
  }


}