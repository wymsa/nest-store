import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { UniqueConstraintExceptionFilter } from './common/filters/unique-constraint-exception/unique-constraint-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false })
  );
  app.useGlobalFilters(new UniqueConstraintExceptionFilter());
  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
