import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, JwtPayload } from '../types'

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized — no token provided' })
    return
  }

  const token = header.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.adminId = payload.adminId
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized — invalid or expired token' })
  }
}
