import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware"

const router = Router()

router.get("/", verifyJWT, (_req, res) => {
  // TODO: fetch from DB
  res.json({ guests: [] })
})

router.post("/", (req, res) => {
  // TODO: save RSVP to DB
  res.status(201).json({ message: "RSVP received", ...req.body })
})

router.get("/export", verifyJWT, (_req, res) => {
  // TODO: generate CSV from DB
  res.setHeader("Content-Type", "text/csv")
  res.send("name,email,attendance,meal_preference\n")
})

export default router
