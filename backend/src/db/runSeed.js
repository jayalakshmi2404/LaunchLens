import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { pool } from './pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function seed() {
  const sql = readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  await pool.query(sql);
  console.log('Seed data inserted successfully.');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
