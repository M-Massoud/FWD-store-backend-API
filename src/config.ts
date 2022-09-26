import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  ENV,
  PGHOST,
  PGUSER,
  PGDATABASE,
  PGPASSWORD,
  PGPORT,
  SALT_ROUNDS,
  TOKEN_SERCRET,
} = process.env;
