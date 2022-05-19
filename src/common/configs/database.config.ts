import { TypeOrmModuleOptions } from '@nestjs/typeorm';

function getBoolean(value: string): boolean {
  try {
    return Boolean(JSON.parse(value));
  } catch {
    throw new Error(value + ' is not a boolean');
  }
}

export const databaseConfiguration: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./dist/**/*.entity{.ts,.js}'],
  synchronize: getBoolean(process.env.DB_SYNCHRONIZE),
};
