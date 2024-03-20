import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';

/**
 * Handle all Exceptions
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {

  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor() {}

  catch(exception: Error, host: ArgumentsHost): void {
    if(!(exception instanceof HttpException) || exception.getStatus() !== 404) {
      this.logger.error(exception, exception.stack);
    }

    const context = host.switchToHttp();

    const statusCode = this.getStatusCode(exception);

    let result;
    if (exception instanceof HttpException) {
      if (isObject(exception.getResponse())) {
        result = exception.getResponse();
        result.stack = this.getStack(exception);
      } else {
        result = this.extracted(exception, statusCode);
      }
    } else {
      result = this.extracted(exception, statusCode);
    }

    context.getResponse()
      .status(statusCode)
      .json(result);
  }

  private extracted(exception: Error, statusCode: number): any {
    const stack = this.getStack(exception);
    const message = exception.message;

    return {
      statusCode,
      message,
      stack,
    };
  }

  private getStatusCode(exception: Error | HttpException) {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getStack(exception: Error) {
    return exception.stack ? exception.stack.split('\n') : undefined;
  }
}
