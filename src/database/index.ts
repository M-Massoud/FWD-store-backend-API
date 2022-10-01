import * as envConfig from '../config';
import { Pool } from 'pg';

const pool = new Pool({
  user: envConfig.PGUSER,
  host: envConfig.PGHOST,
  database:
    envConfig.ENV === 'dev'
      ? envConfig.PGDATABASE_DEV
      : envConfig.PGDATABASE_TEST,
  password: envConfig.PGPASSWORD,
  port: Number(envConfig.PGPORT),
});

pool.on('error', (err: Error) => {
  console.log(err.message);
});

export default pool;
