import { Router } from "express"
import { verifyJWT } from "../middleware/auth.middleware"

const router = Router()

router.get("/", (_req, res) => {
  // TODO: fetch from DB
  res.json({ albums: [], photos: [] })
})

router.post("/", verifyJWT, (req, res) => {
  // TODO: save photo metadata to DB
  res.status(201).json({ message: "Photo uploaded", ...req.body })
})

router.delete("/:id", verifyJWT, (req, res) => {
  // TODO: delete from DB and storage
  res.json({ message: `Photo ${req.params.id} deleted` })
})

export default router
