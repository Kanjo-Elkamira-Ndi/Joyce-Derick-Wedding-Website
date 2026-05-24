import { Request, Response } from 'express'
import { query } from '../db/pool'
import { RsvpRow } from '../types'

/**
 * POST /api/rsvp
 * Public — guest submits their RSVP
 */
export async function createRsvp(req: Request, res: Response): Promise<void> {
  const {
    full_name,
    email,
    attending,
    meal_preference,
    plus_one_name,
    dietary_notes,
  } = req.body as {
    full_name: string
    email: string
    attending: boolean
    meal_preference?: string
    plus_one_name?: string
    dietary_notes?: string
  }

  if (!full_name || !email || attending === undefined) {
    res.status(400).json({ error: 'full_name, email and attending are required' })
    return
  }

  try {
    const { rows } = await query<RsvpRow>(
      `INSERT INTO rsvps
         (full_name, email, attending, meal_preference, plus_one_name, dietary_notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [full_name, email, attending, meal_preference ?? null, plus_one_name ?? null, dietary_notes ?? null]
    )
    res.status(201).json({
      message: "RSVP received! Joyce & Derick can't wait to see you 💌",
      data: rows[0],
    })
  } catch (err) {
    console.error('createRsvp error:', err)
    res.status(500).json({ error: 'Failed to save RSVP' })
  }
}

/**
 * GET /api/admin/rsvps   (protected)
 * Full list with optional filter: ?attending=true
 */
export async function getRsvps(req: Request, res: Response): Promise<void> {
  const { attending } = req.query as { attending?: string }

  let sql = 'SELECT * FROM rsvps'
  const params: any[] = []

  if (attending !== undefined) {
    params.push(attending === 'true')
    sql += ` WHERE attending = $${params.length}`
  }

  sql += ' ORDER BY created_at DESC'

  try {
    const { rows } = await query<RsvpRow>(sql, params)

    const attending_count = rows.filter(r => r.attending).length
    const declining_count = rows.filter(r => !r.attending).length

    res.json({
      data: rows,
      total: rows.length,
      attending: attending_count,
      declining: declining_count,
    })
  } catch (err) {
    console.error('getRsvps error:', err)
    res.status(500).json({ error: 'Failed to fetch RSVPs' })
  }
}

/**
 * GET /api/admin/rsvps/export   (protected)
 * Returns CSV of all RSVPs
 */
export async function exportRsvpsCsv(_req: Request, res: Response): Promise<void> {
  try {
    const { rows } = await query<RsvpRow>(
      'SELECT * FROM rsvps ORDER BY attending DESC, created_at DESC'
    )

    const header = 'Name,Email,Attending,Meal,Plus-One,Dietary Notes,Submitted At'
    const lines = rows.map(r =>
      [
        `"${r.full_name}"`,
        `"${r.email}"`,
        r.attending ? 'Yes' : 'No',
        r.meal_preference ?? '',
        r.plus_one_name ?? '',
        `"${r.dietary_notes ?? ''}"`,
        new Date(r.created_at).toLocaleString('fr-CM'),
      ].join(',')
    )

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="rsvps-joyce-derick.csv"')
    res.send([header, ...lines].join('\n'))
  } catch (err) {
    console.error('exportRsvps error:', err)
    res.status(500).json({ error: 'Failed to export RSVPs' })
  }
}

/**
 * DELETE /api/admin/rsvps/:id   (protected)
 */
export async function deleteRsvp(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const { rowCount } = await query('DELETE FROM rsvps WHERE id = $1', [id])
    if (rowCount === 0) {
      res.status(404).json({ error: 'RSVP not found' })
      return
    }
    res.json({ message: 'RSVP deleted ✅' })
  } catch (err) {
    console.error('deleteRsvp error:', err)
    res.status(500).json({ error: 'Failed to delete RSVP' })
  }
}
