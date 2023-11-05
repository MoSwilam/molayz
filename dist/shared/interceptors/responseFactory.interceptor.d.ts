import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    success: boolean;
    data: T;
}
export declare class ResponseFactoryInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
