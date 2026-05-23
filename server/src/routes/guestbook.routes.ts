import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware"

const router = Router()

router.get("/", (_req, res) => {
  // TODO: fetch approved entries from DB
  res.json({ entries: [] })
})

router.post("/", (req, res) => {
  // TODO: save entry (pending approval) to DB
  res.status(201).json({ message: "Entry submitted", ...req.body })
})

router.patch("/:id/approve", verifyJWT, (req, res) => {
  // TODO: update entry status in DB
  res.json({ message: `Entry ${req.params.id} approved` })
})

router.delete("/:id", verifyJWT, (req, res) => {
  // TODO: delete from DB
  res.json({ message: `Entry ${req.params.id} deleted` })
})

export default router
