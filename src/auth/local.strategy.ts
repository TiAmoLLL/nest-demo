import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'account' }); // 将默认的 username 字段改为 account 字段
    }

    async validate(account: string, password: string): Promise<any> {
        console.log('使用 Local 认证守卫');

        const user = await this.authService.validateUser(account, password);
        if (!user) {
            throw new UnauthorizedException(); // 如果用户不存在或密码不匹配，抛出异常
        }
        return user;
    }
}
