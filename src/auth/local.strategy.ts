import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'account',// 将默认的 username 字段改为 account 字段
            passReqToCallback: true,   // 允许通过 request 传递参数
        });

    }

    async validate(request: any): Promise<any> {
        console.log('使用 Local 认证守卫', request.body);
        const { account, password, userType } = request.body

        const user = await this.authService.validateUser(account, password, userType);
        console.log(user);

        if (!user) {
            return {
                code: 401
            }
            // throw new UnauthorizedException({ statusCode: 200, message: "账号或密码错误" }); // 如果用户不存在或密码不匹配，抛出异常
        }
        return user;
    }
}
