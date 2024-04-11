import { Environment } from '@utils/enums';

export default () => ({
  type: process.env.DB_TYPE || 'postgres',
  synchronize: true, // process.env.NODE_ENV !== Environment.Production,
  logging: process.env.NODE_ENV !== Environment.Production ? 'all' : ['error'],
  logger:
    process.env.NODE_ENV !== Environment.Production
      ? 'advanced-console'
      : 'file',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'nestjs',
  extra: {
    connectionLimit: 30,
  },
  autoLoadEntities: true,
  // migrations: [`dist/migrations/*{.ts,.js}`],
});
