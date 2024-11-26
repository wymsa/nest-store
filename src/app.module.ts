import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultEnvConfig } from './common/configurations/env/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultDatabaseConfig } from './common/configurations/database/database.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(defaultEnvConfig),
    TypeOrmModule.forRootAsync(defaultDatabaseConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
