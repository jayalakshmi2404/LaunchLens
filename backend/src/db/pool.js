import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const useSSL = process.env.DB_SSL === 'true';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/launchlens',
  ssl: useSSL
    ? {
        rejectUnauthorized: false,
      }
    : false,
  connectionTimeoutMillis: 5000, // Prevent hanging connections
});

pool.on('error', (err) => {
  console.error('[PostgreSQL Pool Warning] Database connection error:', err.message);
  // Do NOT process.exit(1) so the Express backend remains running seamlessly!
});

export async function query(text, params) {
  try {
    return await pool.query(text, params);
  } catch (err) {
    console.error('[Database Query Warning]', err.message);
    throw err;
  }
}