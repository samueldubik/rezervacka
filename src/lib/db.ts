import { Pool } from 'pg';

const devConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
};

const prodConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? prodConfig : devConfig);

pool
  .query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

process.on('exit', () => {
  pool.end();
  console.log('Database pool ended');
});

export default pool;
