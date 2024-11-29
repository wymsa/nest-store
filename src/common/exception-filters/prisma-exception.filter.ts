import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const errorCode = exception.code;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = 'Internal server error';

    console.log(exception);

    switch (errorCode) {
      case 'P2002': {
        statusCode = HttpStatus.CONFLICT;
        errorMessage = 'Resource already exists';
        break;
      }
      case 'P2003': {
        statusCode = HttpStatus.NOT_FOUND;
        errorMessage = 'Relation resource not found or already in use';
        break;
      }
      case 'P2025': {
        statusCode = HttpStatus.NOT_FOUND;
        errorMessage = 'Resource not found';
        break;
      }
      default: {
        break;
      }
    }

    response.status(statusCode).json({
      message: errorMessage,
      path: `${request.method} -|- ${request.url}`,
      timestamp: new Date().toLocaleString(),
    });
  }
}
