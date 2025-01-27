import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UniqueExceptionFilter } from './common/exeption-filters/unique.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new UniqueExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
