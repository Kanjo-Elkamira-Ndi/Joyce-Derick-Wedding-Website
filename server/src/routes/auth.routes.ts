import { Router } from 'express'
import { login, me } from '../controllers/auth.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/auth/login
router.post('/login', login)

// GET /api/auth/me  (verify token is still valid)
router.get('/me', requireAuth, me)

export default router
