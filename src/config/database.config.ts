/**
 * Cau hinh ket noi Postgres dung chung cho ung dung NestJS va TypeORM CLI.
 *
 * Ho tro hai cach khai bao:
 *   - DATABASE_URL: dang chuoi ket noi, cac dich vu hosting (Neon, Render,
 *     Railway...) deu cap theo dang nay.
 *   - DB_HOST / DB_PORT / DB_USERNAME / DB_PASSWORD / DB_NAME: dang roi rac,
 *     dang dung o may local.
 * Co DATABASE_URL thi uu tien dung, khong co thi quay ve cac bien roi.
 */

export const isProduction = () => process.env.NODE_ENV === 'production';

/**
 * Postgres tren cloud bat buoc SSL, con Postgres cai o may thi khong co chung
 * chi nen bat SSL se loi. Mac dinh: bat khi co DATABASE_URL, tat khi chay local.
 * Dat DB_SSL=true/false de ep theo y muon.
 */
const shouldUseSsl = (): boolean => {
  const explicit = process.env.DB_SSL;

  if (explicit !== undefined) return explicit === 'true';

  return Boolean(process.env.DATABASE_URL);
};

export interface DatabaseConnection {
  url?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  ssl?: { rejectUnauthorized: boolean };
}

export const getDatabaseConnection = (): DatabaseConnection => {
  const ssl = shouldUseSsl() ? { rejectUnauthorized: false } : undefined;

  if (process.env.DATABASE_URL) {
    return { url: process.env.DATABASE_URL, ssl };
  }

  return {
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl,
  };
};
