import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"
import { guestbook as gbApi } from "@/lib/api"

interface Entry {
  id: string
  guest_name: string
  message: string
  approved: boolean
  created_at: string
}

export default function AdminGuestbook() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEntries = () => {
    setLoading(true)
    gbApi.adminList()
      .then((res) => setEntries(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchEntries() }, [])

  const handleApprove = async (id: string) => {
    try {
      await gbApi.approve(id)
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, approved: true } : e)))
    } catch {
      alert("Failed to approve")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return
    try {
      await gbApi.delete(id)
      setEntries((prev) => prev.filter((e) => e.id !== id))
    } catch {
      alert("Failed to delete")
    }
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-[#5A3319] mb-1">Guestbook</h2>
      <p className="text-[#5A3319]/60 text-sm mb-8">Approve or remove messages</p>

      {loading ? (
        <p className="text-center text-[#5A3319]/40 py-12">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-center text-[#5A3319]/40 py-12">No messages yet</p>
      ) : (
        <div className="space-y-4">
          {entries.map((e) => (
            <div key={e.id} className="bg-white rounded-xl p-6 shadow-sm flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-[#5A3319] text-sm">{e.guest_name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    e.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {e.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="text-[#5A3319]/70 text-sm">{e.message}</p>
                <p className="text-xs text-[#5A3319]/40 mt-2">
                  {new Date(e.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                {!e.approved && (
                  <button
                    onClick={() => handleApprove(e.id)}
                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(e.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
