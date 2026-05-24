import { useEffect, useState } from "react"
import { Download, Trash2 } from "lucide-react"
import { rsvp as rsvpApi } from "@/lib/api"

interface RsvpRow {
  id: string
  full_name: string
  email: string
  attending: boolean
  meal_preference: string | null
  plus_one_name: string | null
  dietary_notes: string | null
  created_at: string
}

export default function AdminRsvp() {
  const [rows, setRows] = useState<RsvpRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRsvps = () => {
    setLoading(true)
    rsvpApi.list()
      .then((res) => setRows(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchRsvps() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this RSVP?")) return
    try {
      await rsvpApi.delete(id)
      setRows((prev) => prev.filter((r) => r.id !== id))
    } catch {
      alert("Failed to delete")
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#5A3319] mb-1">RSVP List</h2>
          <p className="text-[#5A3319]/60 text-sm">Guest responses</p>
        </div>
        <button
          onClick={() => rsvpApi.exportCsv()}
          className="flex items-center justify-center gap-2 px-4 py-2 border border-[#5A3319] text-[#5A3319] rounded-lg text-sm hover:bg-[#5A3319]/5 transition-colors w-full sm:w-auto"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[400px]">
          <thead>
            <tr className="border-b border-[#E5C290]/30">
              <th className="text-left px-4 md:px-6 py-3 text-[#5A3319]/60 font-medium">Name</th>
              <th className="text-left px-4 md:px-6 py-3 text-[#5A3319]/60 font-medium">Email</th>
              <th className="text-left px-4 md:px-6 py-3 text-[#5A3319]/60 font-medium">Attending</th>
              <th className="text-left px-4 md:px-6 py-3 text-[#5A3319]/60 font-medium">Meal</th>
              <th className="text-left px-4 md:px-6 py-3 text-[#5A3319]/60 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 md:px-6 py-8 text-center text-[#5A3319]/40">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={5} className="px-4 md:px-6 py-8 text-center text-[#5A3319]/40">No RSVPs yet</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-[#E5C290]/10">
                  <td className="px-4 md:px-6 py-3 text-[#5A3319]">{r.full_name}</td>
                  <td className="px-4 md:px-6 py-3 text-[#5A3319]/70">{r.email}</td>
                  <td className="px-4 md:px-6 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.attending ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {r.attending ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 text-[#5A3319]/70 capitalize">{r.meal_preference || "—"}</td>
                  <td className="px-4 md:px-6 py-3">
                    <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
