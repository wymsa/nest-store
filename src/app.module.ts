import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultEnvConfig } from './common/configurations/env/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultDatabaseConfig } from './common/configurations/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(defaultEnvConfig),
    TypeOrmModule.forRootAsync(defaultDatabaseConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
