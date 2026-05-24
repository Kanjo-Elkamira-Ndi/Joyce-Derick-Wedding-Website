import { Router } from 'express'
import {
  createRsvp,
  getRsvps,
  exportRsvpsCsv,
  deleteRsvp,
} from '../controllers/rsvp.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/rsvp         — public: guest submits RSVP
router.post('/', createRsvp)

// GET  /api/admin/rsvps          — protected: full list
router.get('/admin', requireAuth, getRsvps)

// GET  /api/admin/rsvps/export   — protected: CSV download
router.get('/admin/export', requireAuth, exportRsvpsCsv)

// DELETE /api/admin/rsvps/:id    — protected
router.delete('/admin/:id', requireAuth, deleteRsvp)

export default router
