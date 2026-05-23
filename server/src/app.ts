import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import galleryRoutes from "./routes/gallery.routes"
import rsvpRoutes from "./routes/rsvp.routes"
import guestbookRoutes from "./routes/guestbook.routes"

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/api/rsvp", rsvpRoutes)
app.use("/api/guestbook", guestbookRoutes)

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
