import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS study_sessions (
    id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    duration_in_hours INTEGER
  )
`).then(() => {
  console.log('Tabela study_sessions verificada/criada ✅');
}).catch((err) => {
  console.error('Erro ao criar tabela study_sessions:', err);
});

module.exports = pool;
