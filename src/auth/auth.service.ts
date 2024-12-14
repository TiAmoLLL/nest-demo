import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // 引入用户服务
import { AdminUserService } from '../admin_user/admin_user.service'; // 引入用户服务
import * as svgCaptcha from 'svg-captcha'
import * as bcrypt from 'bcryptjs';
import e from 'express';
import { ReturnType } from '../types/return-type.interface';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, // 注入用户服务
        private readonly adminUserService: AdminUserService, // 注入用户服务
        private readonly jwtService: JwtService,     // 注入 JWT 服务
    ) { }
    // 创建一个CodeGeeX类型的变量captcha，调用svgCaptcha的create方法，传入参数，然后返回captcha
    createCode() {
        const captcha = svgCaptcha.create({
            size: 4,//生成几个验证码
            fontSize: 50, //文字大小
            width: 100,  //宽度
            height: 34,  //高度
            background: '#cc9966',  //背景颜色
        })
        return captcha
    }
    // 验证用户
    async validateUser(account: string, pass: string, userType: string): Promise<any> {
        // console.log('验证用户', account, pass);
        let user = null;
        // 根据用户类型选择不同的表来查找用户
        if (userType === 'admin') {
            // 从 admin_user 表中查找后台用户
            user = await this.adminUserService.findOneByAccount(account);
        } else if (userType === 'frontend') {
            // 从 user 表中查找前台用户
            user = await this.userService.findOneByAccount(account);
        }

        console.log('user', user,);

        if (user && await bcrypt.compare(pass, user.password)) { // 验证密码
            const { password, ...result } = user;
            console.log("验证后的用户信息", result);

            return result; // 去除密码后返回用户数据
        }
        return null;
    }

    // 登录，生成 JWT 令牌
    async login(user: any) {
        console.log(user, '登录，生成 JWT 令牌');

        const payload = { account: user.account, sub: user.userId, role: user.role }; // 定义 JWT payload
        if (user.code === 401) {
            return {
                code: 401,
            }
        } else {
            return {
                user,
                access_token: this.jwtService.sign(payload), // 签发 JWT
            };
        }

    }
}
