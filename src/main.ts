import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { UniqueConstraintFilter } from './common/exception-filters/unique-constraint.filter';
import { NotFoundExceptionFilter } from './common/exception-filters/not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new UniqueConstraintFilter(),
    new NotFoundExceptionFilter(),
  );

  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
