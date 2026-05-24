import { Request, Response } from 'express'
import { query } from '../db/pool'
import { deleteFromCloudinary } from '../db/cloudinary'
import { MediaRow, Album, ResourceType } from '../types'

/**
 * GET /api/media
 * Public — returns approved media, optionally filtered by album
 * Query: ?album=ceremony&type=image
 */
export async function getMedia(req: Request, res: Response): Promise<void> {
  const { album, type } = req.query as { album?: string; type?: string }

  let sql = 'SELECT * FROM media WHERE approved = true'
  const params: any[] = []

  if (album) {
    params.push(album)
    sql += ` AND album = $${params.length}`
  }
  if (type) {
    params.push(type)
    sql += ` AND resource_type = $${params.length}`
  }

  sql += ' ORDER BY created_at DESC'

  try {
    const { rows } = await query<MediaRow>(sql, params)
    res.json({ data: rows, count: rows.length })
  } catch (err) {
    console.error('getMedia error:', err)
    res.status(500).json({ error: 'Failed to fetch media' })
  }
}

/**
 * GET /api/admin/media   (protected)
 * Returns ALL media including unapproved guest submissions
 */
export async function getAllMedia(_req: Request, res: Response): Promise<void> {
  try {
    const { rows } = await query<MediaRow>(
      'SELECT * FROM media ORDER BY approved ASC, created_at DESC'
    )
    res.json({ data: rows, count: rows.length })
  } catch (err) {
    console.error('getAllMedia error:', err)
    res.status(500).json({ error: 'Failed to fetch media' })
  }
}

/**
 * POST /api/admin/media/upload   (protected, multipart/form-data)
 * Fields: file (image or video), album, caption
 * Multer + Cloudinary handles the actual upload — req.file has the result
 */
export async function uploadMedia(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' })
      return
    }

    const file = req.file as Express.Multer.File & {
      path: string
      filename: string
      // multer-storage-cloudinary attaches these:
      cloudinary?: { secure_url: string; public_id: string; resource_type: string }
    }

    // multer-storage-cloudinary puts cloudinary result on req.file
    const cloudinaryFile = file as any
    const url         = cloudinaryFile.path || cloudinaryFile.secure_url
    const public_id   = cloudinaryFile.filename || cloudinaryFile.public_id
    const resource_type: ResourceType =
      (cloudinaryFile.resource_type ?? 'image') as ResourceType

    const album: Album   = (req.body.album as Album) || 'pre-wedding'
    const caption: string = req.body.caption ?? ''

    const { rows } = await query<MediaRow>(
      `INSERT INTO media (url, public_id, resource_type, album, caption, approved)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING *`,
      [url, public_id, resource_type, album, caption]
    )

    res.status(201).json({ message: 'Media uploaded ✅', data: rows[0] })
  } catch (err) {
    console.error('uploadMedia error:', err)
    res.status(500).json({ error: 'Upload failed' })
  }
}

/**
 * POST /api/media/guest-submit   (public, multipart/form-data)
 * Guest photo submission — goes into media with approved=false
 */
export async function guestSubmitMedia(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' })
      return
    }

    const cloudinaryFile = req.file as any
    const url         = cloudinaryFile.path || cloudinaryFile.secure_url
    const public_id   = cloudinaryFile.filename || cloudinaryFile.public_id

    const submitted_by: string = req.body.name || 'Anonymous Guest'
    const album: Album = 'ceremony' // guest photos default to ceremony album

    const { rows } = await query<MediaRow>(
      `INSERT INTO media (url, public_id, resource_type, album, approved, submitted_by)
       VALUES ($1, $2, 'image', $3, false, $4)
       RETURNING *`,
      [url, public_id, album, submitted_by]
    )

    res.status(201).json({
      message: 'Photo submitted! It will appear after review. 🙏',
      data: rows[0],
    })
  } catch (err) {
    console.error('guestSubmitMedia error:', err)
    res.status(500).json({ error: 'Submission failed' })
  }
}

/**
 * PATCH /api/admin/media/:id/approve   (protected)
 * Approve a guest-submitted photo
 */
export async function approveMedia(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const { rows } = await query<MediaRow>(
      'UPDATE media SET approved = true WHERE id = $1 RETURNING *',
      [id]
    )
    if (rows.length === 0) {
      res.status(404).json({ error: 'Media not found' })
      return
    }
    res.json({ message: 'Approved ✅', data: rows[0] })
  } catch (err) {
    console.error('approveMedia error:', err)
    res.status(500).json({ error: 'Failed to approve media' })
  }
}

/**
 * PATCH /api/admin/media/:id   (protected)
 * Update album or caption
 */
export async function updateMedia(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const { album, caption } = req.body as { album?: Album; caption?: string }

  const fields: string[] = []
  const params: any[] = []

  if (album)   { params.push(album);   fields.push(`album = $${params.length}`) }
  if (caption !== undefined) { params.push(caption); fields.push(`caption = $${params.length}`) }

  if (fields.length === 0) {
    res.status(400).json({ error: 'Nothing to update' })
    return
  }

  params.push(id)
  try {
    const { rows } = await query<MediaRow>(
      `UPDATE media SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`,
      params
    )
    if (rows.length === 0) {
      res.status(404).json({ error: 'Media not found' })
      return
    }
    res.json({ message: 'Updated ✅', data: rows[0] })
  } catch (err) {
    console.error('updateMedia error:', err)
    res.status(500).json({ error: 'Failed to update media' })
  }
}

/**
 * DELETE /api/admin/media/:id   (protected)
 * Deletes from Cloudinary first, then from DB
 */
export async function deleteMedia(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const { rows } = await query<MediaRow>(
      'SELECT public_id, resource_type FROM media WHERE id = $1',
      [id]
    )
    if (rows.length === 0) {
      res.status(404).json({ error: 'Media not found' })
      return
    }

    const { public_id, resource_type } = rows[0]
    await deleteFromCloudinary(public_id, resource_type)

    await query('DELETE FROM media WHERE id = $1', [id])
    res.json({ message: 'Deleted from Cloudinary and DB ✅' })
  } catch (err) {
    console.error('deleteMedia error:', err)
    res.status(500).json({ error: 'Failed to delete media' })
  }
}
