import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const errorDetails = (exception as any).detail;
    const errorTarget = this.getErrorTarget(errorDetails);

    response.status(HttpStatus.CONFLICT).json({
      message: `Resource with value | ${errorTarget?.value} | already exists`,
      target: errorTarget?.value,
      path: request.url,
      timestamp: new Date().toLocaleString(),
    });
  }

  private getErrorTarget(errorDetails: string) {
    const match = errorDetails.match(/\((.+?)\)=\((.+?)\)/);

    return match ? { data: match[0], field: match[1], value: match[2] } : null;
  }
}
