import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

export class UniqueConstraintFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    throw new Error('Method not implemented.');
  }
}
