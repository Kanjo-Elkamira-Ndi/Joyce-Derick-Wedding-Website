import { Router } from "express"
import { signToken } from "../middleware/auth.middleware"

const router = Router()

router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (username === "admin" && password === (process.env.ADMIN_PASSWORD || "admin")) {
    const token = signToken("admin")
    res.json({ token })
    return
  }

  res.status(401).json({ message: "Invalid credentials" })
})

export default router
