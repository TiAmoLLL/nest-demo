import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Data<T> {
    data: T;
}

@Injectable()
export class Responses<T> implements NestInterceptor {
    intercept(context, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(map(data => {
            return {
                data,
                status: 200,
                message: "成功",
                success: true
            }
        }))
    }
}