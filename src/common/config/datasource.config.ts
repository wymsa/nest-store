import 'dotenv/config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_CONNECTION_STRING,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
});

export default AppDataSource;
