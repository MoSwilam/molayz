import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';

interface IError {
  error: string;
}

interface IErrorResponse {
  code: number;
  path: string;
  method: string;
  timestamp: Date | string;
  message: string | null;
  errors?: IError[] | undefined;
  context: string;
}

@Catch()
export class GlobalErrorHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalErrorHandler.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    /** Validation errors */
    const { response: exceptionResponse } = exception;
    let errors;
    if (exceptionResponse && exceptionResponse instanceof Array) {
      const [validatedObjectErrors] = exceptionResponse;
      errors = validatedObjectErrors.constraints || undefined;
    }
    const errorMessage =
      errors && Object.keys(errors).length ? 'Validation Error' : exception.message;

    const errorResponse: IErrorResponse = {
      code: status,
      path: request.url,
      method: request.method,
      timestamp: new Date().toLocaleString(),
      context: GlobalErrorHandler.name,
      message: errorMessage,
      errors: errors
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) console.error(exception);
    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse, undefined, 2)
    );
    response.status(status).json(errorResponse);
  }
}
