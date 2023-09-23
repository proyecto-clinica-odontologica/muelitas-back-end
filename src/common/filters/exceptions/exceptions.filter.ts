import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { obtenerTiempo } from 'src/helpers/obtenerTiempo';

@Catch()
export class ExceptionsFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    response.status(status).json({
      statusCode: status,
      timestamp: obtenerTiempo(),
      path: request.url,
      message: message['message'],
      error: message['error'],
    });
  }
}
