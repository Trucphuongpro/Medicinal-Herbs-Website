import 'dotenv/config';
import { DataSource } from 'typeorm';
import { getDatabaseConnection } from './src/config/database.config';

export default new DataSource({
  type: 'postgres',
  ...getDatabaseConnection(),
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  synchronize: false,
});
