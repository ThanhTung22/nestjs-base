import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  subscribers: ['./dist/modules/**/*.subscriber{.ts,.js}'],
  entities: ['./dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['./dist/database/migrations/*{.ts,.js}'],
  synchronize: true,
  keepConnectionAlive: true,
  migrationsRun: true,
  logging: 'all',
};
