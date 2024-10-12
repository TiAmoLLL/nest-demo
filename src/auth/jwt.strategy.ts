import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-token'), // 从请求头中提取 JWT
      ignoreExpiration: false, // 忽略过期设置为 false
      secretOrKey: jwtConstants.secret, // JWT 密钥
    });
  }

  async validate(payload: any) {
    console.log('jwt验证');

    console.log(payload, "payload");
    return { userId: payload.sub, account: payload.account }; // 返回用户信息
  }
}
