import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { query } from '../db/pool'

export async function login(req: Request, res: Response): Promise<void> {
  const { password } = req.body as { password?: string }
  if (!password) { res.status(400).json({ error: 'Password is required' }); return }

  try {
    const { rows } = await query('SELECT id, password_hash FROM admin LIMIT 1')
    if (rows.length === 0) { res.status(500).json({ error: 'Admin not initialised' }); return }

    const admin = rows[0]
    const match = await bcrypt.compare(password, admin.password_hash as string)
    if (!match) { res.status(401).json({ error: 'Invalid password' }); return }

    const opts: SignOptions = { expiresIn: '7d' }
    const token = jwt.sign({ adminId: admin.id as string }, process.env.JWT_SECRET as string, opts)

    res.json({ message: 'Welcome back! 💍', token })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function me(_req: Request, res: Response): Promise<void> {
  res.json({ authenticated: true, message: 'Token is valid' })
}
