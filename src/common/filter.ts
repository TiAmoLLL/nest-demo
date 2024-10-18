
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'

import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // 切换到Http协议
        const ctx = host.switchToHttp()
        // 获取请求
        const request = ctx.getRequest<Request>()
        // 获取响应
        const response = ctx.getResponse<Response>()

        // 获取异常状态码
        const status = exception.getStatus()
        console.log(exception, "捕捉异常");

        // 设置响应状态码，返回JSON数据
        response.status(status).json({
            data: exception.message,
            time: new Date().getTime(),
            success: false,
            path: request.url,
            code: status
        })
    }
}