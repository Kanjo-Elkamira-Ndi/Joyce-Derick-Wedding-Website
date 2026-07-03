import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { runSchema, seedAdmin } from './db/seed'

import authRoutes      from './routes/auth.routes'
import mediaRoutes     from './routes/media.routes'
import rsvpRoutes      from './routes/rsvp.routes'
import guestbookRoutes from './routes/guestbook.routes'

dotenv.config()

const app  = express()
const PORT = process.env.PORT ?? 3000

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Health check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).type('text/plain').send('OK')
})

app.get('/api/health', (_req, res) => {
  res.json({
    status:  'ok',
    service: 'Joyce & Derick Wedding API 💍',
    time:    new Date().toISOString(),
  })
})

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',      authRoutes)
app.use('/api/media',     mediaRoutes)
app.use('/api/rsvp',      rsvpRoutes)
app.use('/api/guestbook', guestbookRoutes)

// ── 404 ───────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ──────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// ── Self-ping keep-alive ──────────────────────────────────
function startSelfPing() {
  const baseUrl = process.env.RENDER_EXTERNAL_URL ?? `http://localhost:${PORT}`
  const url = `${baseUrl}/health`
  const intervalMs = 10 * 60 * 1000 // 10 minutes

  const ping = async () => {
    try {
      const res = await fetch(url)
      const text = await res.text()
      console.log(`[keep-alive] ✅ ${url} → ${res.status} ${text}`)
    } catch (err) {
      console.error(`[keep-alive] ❌ ${url} →`, (err as Error).message)
    }
  }

  // First ping after 10 minutes, then every 10 minutes
  setTimeout(() => {
    ping()
    setInterval(ping, intervalMs)
  }, intervalMs)

  console.log(`[keep-alive] ⏰ Will ping ${url} every 10 minutes`)
}

// ── Boot ──────────────────────────────────────────────────
async function boot() {
  try {
    await runSchema()
    await seedAdmin()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`🔗 Client expected at: ${process.env.CLIENT_URL}`)
      startSelfPing()
    })
  } catch (err) {
    console.error('❌ Failed to boot server:', err)
    process.exit(1)
  }
}

boot()

export default app
