import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { PostgresUniqueConstraintError } from '../types/unique-constraint-error.type';

@Catch(QueryFailedError)
export class UniqueExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const driverError = exception.driverError as unknown as PostgresUniqueConstraintError;
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    let responseObject = {};

    switch (driverError.code) {
      case '23505': {
        responseObject = {
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Entity already exists',
        };
        break;
      }

      default: {
        responseObject = {
          timestamp: new Date().toISOString(),
          path: request.url,
          message: 'Something went wrong',
        };
        break;
      }
    }

    console.log(driverError);
    response.status(HttpStatus.BAD_REQUEST).json(responseObject);
  }
}
