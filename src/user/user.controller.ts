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


  // @ApiTags("添加用户")
  @ApiOperation({ summary: "添加用户" })
  @Post('create')
  create(@Req() req, @Body() body) {
    // 
    console.log('添加用户');

    console.log(req, body)
    const params: User = {
      account: 'admin',
      password: 'password',
      username: 'admin',
      role: '1'

    }
    return this.userService.create(params);
    // return this.userService.create(req);
  }
  // @ApiTags("通过id查找指定用户")
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   // return this.userService.create(createUserDto);
  //   console.log(typeof createUserDto)
  //   return {
  //     code: 200,
  //     "data": createUserDto
  //   }
  // }
  @ApiTags("获取所有用户")
  // @UseGuards(JwtAuthGuard) // 使用 JWT 守卫(jwt保护)
  @Get('findAll')
  @HttpCode(200)
  async findAll(@Query() query) {
    // console.log(await this.userService.findAll(query))
    console.log('获取所有用户')
    // return this.userService.findAll();
    return {
      code: 200,
      message: 'success',
      success: true,
      data: await this.userService.findAll(query)
    }
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   // return this.userService.update(+id, updateUserDto);
  //   console.log(id,
  //     updateUserDto)
  //   return {
  //     code: 200,
  //     id,
  //     data: updateUserDto
  //   }
  // }

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
