import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Data<T> {
    data: T;
}

@Injectable() // 定义一个服务
export class Responses<T> implements NestInterceptor { // 实现NestInterceptor接口
    intercept(context, next: CallHandler): Observable<Data<T>> { // 拦截请求
        return next.handle().pipe(map(data => { // 将拦截到的请求处理成 observable
            return {
                data, // 数据
                status: 200, // 状态码
                message: "成功", // 消息
                success: true // 是否成功
            }
        }))
    }
}