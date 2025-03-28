import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { PrismaKnownExceptionFilter } from './common/filters/prisma-known-exception/prisma-known-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false })
  );
  app.useGlobalFilters(new PrismaKnownExceptionFilter());
  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
