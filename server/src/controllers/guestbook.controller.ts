import { Request, Response } from 'express'
import { query } from '../db/pool'
import { GuestbookRow } from '../types'

/**
 * GET /api/guestbook
 * Public — returns only approved messages, shown on the site
 */
export async function getApprovedMessages(_req: Request, res: Response): Promise<void> {
  try {
    const { rows } = await query<GuestbookRow>(
      'SELECT * FROM guestbook WHERE approved = true ORDER BY created_at DESC'
    )
    res.json({ data: rows, count: rows.length })
  } catch (err) {
    console.error('getApprovedMessages error:', err)
    res.status(500).json({ error: 'Failed to fetch guestbook messages' })
  }
}

/**
 * POST /api/guestbook
 * Public — guest submits a wish, defaults to approved=false
 */
export async function submitMessage(req: Request, res: Response): Promise<void> {
  const { guest_name, message } = req.body as {
    guest_name: string
    message: string
  }

  if (!guest_name?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'guest_name and message are required' })
    return
  }

  if (message.trim().length > 1000) {
    res.status(400).json({ error: 'Message must be under 1000 characters' })
    return
  }

  try {
    const { rows } = await query<GuestbookRow>(
      'INSERT INTO guestbook (guest_name, message) VALUES ($1, $2) RETURNING *',
      [guest_name.trim(), message.trim()]
    )
    res.status(201).json({
      message: 'Your wish has been sent! It will appear after review. 🙏',
      data: rows[0],
    })
  } catch (err) {
    console.error('submitMessage error:', err)
    res.status(500).json({ error: 'Failed to submit message' })
  }
}

/**
 * GET /api/admin/guestbook   (protected)
 * All messages including pending — for admin moderation
 */
export async function getAllMessages(_req: Request, res: Response): Promise<void> {
  try {
    const { rows } = await query<GuestbookRow>(
      'SELECT * FROM guestbook ORDER BY approved ASC, created_at DESC'
    )
    const pending  = rows.filter(r => !r.approved).length
    const approved = rows.filter(r => r.approved).length

    res.json({ data: rows, total: rows.length, pending, approved })
  } catch (err) {
    console.error('getAllMessages error:', err)
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
}

/**
 * PATCH /api/admin/guestbook/:id/approve   (protected)
 * Approve a pending message — it will now show on the public site
 */
export async function approveMessage(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const { rows } = await query<GuestbookRow>(
      'UPDATE guestbook SET approved = true WHERE id = $1 RETURNING *',
      [id]
    )
    if (rows.length === 0) {
      res.status(404).json({ error: 'Message not found' })
      return
    }
    res.json({ message: 'Message approved — now visible on the site ✅', data: rows[0] })
  } catch (err) {
    console.error('approveMessage error:', err)
    res.status(500).json({ error: 'Failed to approve message' })
  }
}

/**
 * DELETE /api/admin/guestbook/:id   (protected)
 * Remove a message from the DB entirely
 */
export async function deleteMessage(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const { rowCount } = await query('DELETE FROM guestbook WHERE id = $1', [id])
    if (rowCount === 0) {
      res.status(404).json({ error: 'Message not found' })
      return
    }
    res.json({ message: 'Message deleted ✅' })
  } catch (err) {
    console.error('deleteMessage error:', err)
    res.status(500).json({ error: 'Failed to delete message' })
  }
}
