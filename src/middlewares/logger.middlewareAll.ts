import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants'; // 导入你的 JWT 密钥
@Injectable()
export class LoggerMiddlewareAll implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        // next();
        // 获取 x-token
        console.log('全局中间件', req.originalUrl, req.originalUrl.startsWith('/admin'))
        // console.log(req.headers, '中间件')
        if (req.originalUrl === '/api/auth/login')
            return next()
        const token = req.headers['x-token']?.split(' ')[1]; // 解析出 Bearer 后的 token
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
            const userRole = req.user.role;
            // 判断用户是否有权限
            if (userRole === 'admin') {
                console.log('后台用户');
            } else if (userRole === 'frontend') {
                console.log('前台用户');
            }
            // 根据用户角色限制接口访问
            if (req.originalUrl.startsWith('/api/admin') && userRole !== 'admin') {
                throw new ForbiddenException('后台接口仅限管理员访问');
            } else if (req.originalUrl.startsWith('/api/frontend') && userRole !== 'frontend') {
                throw new ForbiddenException('前台接口仅限前端用户访问');
            }
            return next(); // 验证通过，继续处理请求


        })



    }
}
