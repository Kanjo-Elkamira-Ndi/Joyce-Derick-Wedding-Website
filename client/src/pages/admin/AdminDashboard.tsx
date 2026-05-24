import { useEffect, useState } from "react"
import { rsvp as rsvpApi, guestbook as gbApi, media as mediaApi } from "@/lib/api"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ rsvps: 0, media: 0, guestbook: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      rsvpApi.list().catch(() => ({ total: 0 })),
      mediaApi.adminList().catch(() => ({ count: 0 })),
      gbApi.adminList().catch(() => ({ total: 0 })),
    ]).then(([r, m, g]) => {
      setStats({
        rsvps: (r as any).total ?? 0,
        media: (m as any).count ?? 0,
        guestbook: (g as any).total ?? 0,
      })
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 className="font-serif text-3xl text-[#5A3319] mb-2">Dashboard</h2>
      <p className="text-[#5A3319]/60 text-sm mb-8">Overview of your wedding site</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#5A3319]/50 mb-1">RSVPs</p>
          <p className="font-serif text-4xl text-[#5A3319]">{loading ? "..." : stats.rsvps}</p>
          <p className="text-xs text-[#5A3319]/40 mt-1">responses received</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#5A3319]/50 mb-1">Gallery</p>
          <p className="font-serif text-4xl text-[#5A3319]">{loading ? "..." : stats.media}</p>
          <p className="text-xs text-[#5A3319]/40 mt-1">photos uploaded</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#5A3319]/50 mb-1">Guestbook</p>
          <p className="font-serif text-4xl text-[#5A3319]">{loading ? "..." : stats.guestbook}</p>
          <p className="text-xs text-[#5A3319]/40 mt-1">messages</p>
        </div>
      </div>
    </div>
  )
}
