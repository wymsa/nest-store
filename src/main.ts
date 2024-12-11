import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { PrismaExceptionFilter } from "./common/exception-filters/prisma-exception.filter";
import { NotFoundExceptionFilter } from "./common/exception-filters/not-found.filter";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    }),
  );
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
