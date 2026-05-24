import { Router } from 'express'
import {
  getMedia,
  getAllMedia,
  uploadMedia,
  guestSubmitMedia,
  approveMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/media.controller'
import { requireAuth } from '../middleware/auth'
import { uploadImage, uploadVideo } from '../db/cloudinary'

const router = Router()

// ── Public ───────────────────────────────────────────────
// GET  /api/media              — approved media (filterable by album, type)
router.get('/', getMedia)

// POST /api/media/guest-submit — guest submits a photo (goes to moderation)
router.post('/guest-submit', uploadImage.single('file'), guestSubmitMedia)

// ── Protected (admin only) ────────────────────────────────
// GET    /api/admin/media           — all media including pending
router.get('/admin', requireAuth, getAllMedia)

// POST   /api/admin/media/upload    — admin uploads image
router.post('/admin/upload/image', requireAuth, uploadImage.single('file'), uploadMedia)

// POST   /api/admin/media/upload/video — admin uploads video
router.post('/admin/upload/video', requireAuth, uploadVideo.single('file'), uploadMedia)

// PATCH  /api/admin/media/:id/approve
router.patch('/admin/:id/approve', requireAuth, approveMedia)

// PATCH  /api/admin/media/:id       — update album or caption
router.patch('/admin/:id', requireAuth, updateMedia)

// DELETE /api/admin/media/:id
router.delete('/admin/:id', requireAuth, deleteMedia)

export default router
