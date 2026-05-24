import { Pool, QueryResultRow } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

pool.on('error', (err) => {
  console.error('🔴 Unexpected PostgreSQL error:', err)
})

export const query = <T extends QueryResultRow = QueryResultRow>(text: string, params?: unknown[]) =>
  pool.query<T>(text, params)

export default pool
