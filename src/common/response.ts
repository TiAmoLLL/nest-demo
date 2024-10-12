import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Data<T> {
    data: T;
}

@Injectable() // 定义一个服务
export class Responses<T> implements NestInterceptor { // 实现NestInterceptor接口
    intercept(context, next: CallHandler): Observable<Data<T>> { // 拦截请求
        return next.handle().pipe(map(data => { // 将拦截到的请求处理成 observable
            console.log(data)
            return {
                code: data.code, // 状态码
                message: data.message, // 消息
                success: data.success, // 是否成功
                data: data.data || data, // 数据
            }


        }))
    }
}