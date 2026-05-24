import { useState } from "react"
import { LogIn } from "lucide-react"

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem("admin_token", "mock-token")
      onLogin()
    } else {
      setError("Invalid credentials")
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5C290]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5C290] bg-[#FDF8F2]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5C290]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#E5C290] bg-[#FDF8F2]"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-[#5A3319] text-[#E5C290] rounded-lg text-sm font-medium uppercase tracking-widest hover:bg-[#3d2010] transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={16} />
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
