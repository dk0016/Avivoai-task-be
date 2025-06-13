import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';
import configuration from 'src/configuration/configuration';
import * as path from 'path';

config();

export const dbConnectionOptions: DataSourceOptions = {
  type: 'mysql' as const,
  host: configuration().database.host,
  port: configuration().database.port,
  username: configuration().database.username,
  password: configuration().database.password,
  database: configuration().database.name,
  entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: ['local'].includes(configuration().env.toLowerCase()),
};

const dataSource = new DataSource(dbConnectionOptions);

export default dataSource;
