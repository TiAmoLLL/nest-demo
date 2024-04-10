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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'
import { ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiTags("getUser")
  @Get('getUser')
  getUser(@Req() req) {
    return {
      code: 200,
      data: this.userService.getUser()
    }
  }

  @ApiTags("获取验证码")
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = this.userService.createCode()
    console.log(captcha, session)
    // session.code(captcha.text);
    req.session.code = captcha.text
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('create')
  create(@Req() req, @Body() body) {
    // return this.userService.create(createUserDto);
    // console.log(typeof createUserDto)
    if (req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()) {
      return {
        code: 200,
        message: "success"
      }
    } else {
      return {
        code: 200,
        message: "code error"
      }
    }
  }
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   // return this.userService.create(createUserDto);
  //   console.log(typeof createUserDto)
  //   return {
  //     code: 200,
  //     "data": createUserDto
  //   }
  // }

  // @Get()
  // findAll(@Query() query) {
  //   console.log(query)
  //   // return this.userService.findAll();
  //   return {
  //     code: 200,
  //     message: query.name
  //   }
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

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
