import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Req,
  Res,
  Query,
  Headers,
  HttpCode,
  Session,
  UseGuards,
  Put,

} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@ApiTags("user") //添加api注释
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: "getUser" }) // 使用@ApiOperation装饰器为每个请求方法添加描述，提高文档的可读性：
  @UseGuards(JwtAuthGuard) // 使用 JWT 守卫(jwt保护)
  @Get('getUser')
  getUser(@Req() req) {
    return {
      code: 200,
      message: 'success',
      success: true,
      data: this.userService.getUser() // 调用userService中的getUser方法
    }
  }
  @ApiOperation({ summary: "info" }) // 使用@ApiOperation装饰器为每个请求方法添加描述，提高文档的可读性：

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
  async create(@Req() req, @Body() body) {
    console.log('添加用户');
    console.log(body)
    const result = await this.userService.create(body);
    return result
  }


  @ApiOperation({ summary: "删除用户" })
  @Delete('delete/:id')
  @HttpCode(200)
  async delete(@Param('id') id: number) {
    console.log('接收到的删除请求，用户 ID:', id);

    // 调用 service 的 delete 方法来删除用户
    const result = await this.userService.delete(id);

    // 返回结果
    return result
  }


  @ApiOperation({ summary: "获取用户" })
  @Get('findAll')
  @HttpCode(200)
  async findAll(@Query() query) {
    // console.log(await this.userService.findAll(query))
    console.log('获取用户',query)
    // return this.userService.findAll();
    return {
      code: 200,
      message: 'success',
      success: true,
      data: await this.userService.findAll(query)
    }
  }


  @ApiOperation({ summary: "修改用户信息" })
  @Put('update')
  @HttpCode(200)
  update(@Req() req, @Body() body) {
    // return this.userService.update(+id, updateUserDto);
    console.log('修改用户信息');

    console.log(body)
    const result = this.userService.update(body)
    return {
      code: 200,
      data: "测试"
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.userService.remove(+id);
  //   console.log(id)
  //   return {
  //     code: 200,
  //     id
  //   }
  // }
}
