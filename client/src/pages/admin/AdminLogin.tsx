import { useState } from "react"
import { LogIn } from "lucide-react"
import { auth as authApi } from "@/lib/api"

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await authApi.login(password)
      sessionStorage.setItem("admin_token", res.token)
      onLogin()
    } catch (err: any) {
      setError(err.message || "Invalid password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5ECD8] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-lg"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#5A3319]">J & D</h1>
          <p className="text-sm text-[#5A3319]/60 mt-1">Admin Login</p>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5C290]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5C290] bg-[#FDF8F2]"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#5A3319] text-[#E5C290] rounded-lg text-sm font-medium uppercase tracking-widest hover:bg-[#3d2010] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn size={16} />
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  )
}
