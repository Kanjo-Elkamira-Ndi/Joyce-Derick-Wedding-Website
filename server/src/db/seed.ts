import { query } from './pool'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

export async function runSchema() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  await query(sql)
  console.log('✅ Schema applied')
}

export async function seedAdmin() {
  const plain = process.env.ADMIN_PASSWORD
  if (!plain) {
    console.warn('⚠️  ADMIN_PASSWORD not set — skipping admin seed')
    return
  }

  const { rows } = await query('SELECT id FROM admin LIMIT 1')
  if (rows.length > 0) {
    console.log('ℹ️  Admin already exists — skipping seed')
    return
  }

  const hash = await bcrypt.hash(plain, 12)
  await query('INSERT INTO admin (password_hash) VALUES ($1)', [hash])
  console.log('✅ Admin account created')
}
