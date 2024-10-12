import { Controller, Post, Body, Request, UseGuards, Get, Req, Res, Session, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
@ApiTags('登录接口')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: '用户登录' })
    @UseGuards(LocalAuthGuard) // 使用 Local 认证守卫
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        console.log('登录接口', this.authService.login(req.user));
        return {
            code: 200,
            message: 'success',
            success: true,
            data: await this.authService.login(req.user) // 登录成功，返回 JWT
        }
        // return this.authService.login(req.user); // 登录成功，返回 JWT
    }
    @ApiTags("获取验证码")
    @ApiOperation({ summary: "获取验证码" })
    @Get('code')
    createCode(@Req() req, @Res() res, @Session() session) {
        const captcha = this.authService.createCode() // 调用userService中的createCode方法
        console.log(captcha, session)
        // session.code(captcha.text);
        req.session.code = captcha.text // 将验证码text存储在session中
        res.type('image/svg+xml');
        res.send(captcha.data); // 返回验证码图片数据
    }
}