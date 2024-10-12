import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants'; // 导入你的 JWT 密钥
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 获取 x-token
    const token = req.headers['x-token']?.split(' ')[1]; // 解析出 Bearer 后的 token
    // console.log(req.headers, '中间件')
    console.log('非全局中间件')
    if (!token) {
      throw new UnauthorizedException('Token不存在');
    }

    // 验证 JWT
    jwt.verify(token, jwtConstants.secret, (err, decoded) => {
      if (err) {
        console.log('Token verification failed:', err);
        throw new UnauthorizedException('Token错误');
      }

      console.log('Token decoded:', decoded);
      // 可以在请求对象中添加用户信息
      req.user = decoded; // 将解码后的用户信息附加到请求中
      next(); // 验证通过，继续处理请求

      // next(); // 验证通过，继续处理请求
    })
    // res.send('请求拦截')
    // next();
  }
}
