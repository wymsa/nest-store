import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaKnownExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();

    let responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      path: `${request.path} | ${request.method}`,
      message: `Internal server error`,
      timestamp: new Date().toISOString()
    };

    switch (exception.code) {
      case 'P2002': {
        responseBody = {
          statusCode: HttpStatus.CONFLICT,
          path: `${request.path} | ${request.method}`,
          message: `Record '[${exception.meta?.modelName}]' already exists`,
          timestamp: new Date().toISOString()
        };

        break;
      }

      case 'P2025': {
        responseBody = {
          statusCode: HttpStatus.BAD_REQUEST,
          path: `${request.path} | ${request.method}`,
          message: `Record '[${exception.meta?.modelName}]' does not exists`,
          timestamp: new Date().toISOString()
        };

        break;
      }
    }

    console.error(`PrismaKnownExceptionFilter |`, JSON.parse(JSON.stringify(exception)));

    response.status(responseBody.statusCode).send(responseBody);
  }
}
