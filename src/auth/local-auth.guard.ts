import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    // 重写 canActivate 方法
    canActivate(context: any): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('LocalAuthGuard 开始验证...', request.body);
        // 假设你从请求体或请求头中获取 userType
        const userType = request.body.userType || request.headers['user-type'];  // 根据实际情况获取

        // 将 userType 加入请求对象中，供后续处理
        request.userType = userType;
        console.log('LocalAuthGuard 正在验证...', request.userType);
        // 调用父类的 canActivate 方法，返回一个 boolean 或 Promise<boolean>
        return super.canActivate(context);  // 继续执行验证
    }
}
