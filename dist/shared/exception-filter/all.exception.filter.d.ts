import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class GlobalErrorHandler implements ExceptionFilter {
    private readonly logger;
    catch(exception: any, host: ArgumentsHost): void;
}
