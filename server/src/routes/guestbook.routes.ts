import { Router } from 'express'
import {
  getApprovedMessages,
  submitMessage,
  getAllMessages,
  approveMessage,
  deleteMessage,
} from '../controllers/guestbook.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

// GET  /api/guestbook         — public: approved messages shown on site
router.get('/', getApprovedMessages)

// POST /api/guestbook         — public: guest submits a wish
router.post('/', submitMessage)

// GET    /api/admin/guestbook           — protected: all messages + pending
router.get('/admin', requireAuth, getAllMessages)

// PATCH  /api/admin/guestbook/:id/approve — protected: approve a message
router.patch('/admin/:id/approve', requireAuth, approveMessage)

// DELETE /api/admin/guestbook/:id         — protected: delete a message
router.delete('/admin/:id', requireAuth, deleteMessage)

export default router
