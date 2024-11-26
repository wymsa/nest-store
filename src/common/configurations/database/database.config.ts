import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseEnvVariables } from '../env/env.config';

export const defaultDatabaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService<DatabaseEnvVariables>) => ({
    type: 'postgres',
    host: configService.getOrThrow('database.host', { infer: true }),
    port: configService.getOrThrow('database.port', { infer: true }),
    username: configService.getOrThrow('database.username', { infer: true }),
    password: configService.getOrThrow('database.password', { infer: true }),
    database: configService.getOrThrow('database.name', { infer: true }),
    entities: ['src/**/*.entity.js'],
    autoLoadEntities: true,
    synchronize: false,
  }),
  imports: [ConfigModule],
  inject: [ConfigService],
};
