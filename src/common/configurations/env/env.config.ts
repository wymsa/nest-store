import { ConfigModuleOptions, registerAs } from '@nestjs/config';

const appEnvVariables = registerAs('app', () => ({
  port: Number(process.env.APP_PORT),
}));

const databaseEnvVariables = registerAs('database', () => ({
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}));

export const defaultEnvConfig: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [appEnvVariables, databaseEnvVariables],
};

// types
export type AppEnvVariables = { app: ReturnType<typeof appEnvVariables> };
export type DatabaseEnvVariables = {
  database: ReturnType<typeof databaseEnvVariables>;
};
