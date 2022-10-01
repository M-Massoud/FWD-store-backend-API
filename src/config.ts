import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  ENV,
  PGHOST,
  PGUSER,
  PGDATABASE_DEV,
  PGDATABASE_TEST,
  PGPASSWORD,
  PGPORT,
  SALT_ROUNDS,
  TOKEN_SERCRET,
} = process.env;
