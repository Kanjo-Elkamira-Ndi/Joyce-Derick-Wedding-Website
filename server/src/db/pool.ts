import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || "postgres://localhost:5432/wedding",
})

pool.on("error", (err) => {
  console.error("Unexpected pool error", err)
})

export default pool
