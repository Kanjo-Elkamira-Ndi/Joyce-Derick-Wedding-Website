import { Check, X } from "lucide-react"

const entries = [
  { name: "Auntie Marie", message: "May God bless your home with love, laughter, and many beautiful children.", date: "Oct 12, 2025", approved: true },
  { name: "Eric & Sandra", message: "Watching your love grow has been a gift. Congratulations, dear friends.", date: "Oct 9, 2025", approved: true },
  { name: "Pastor Joseph", message: "Two becoming one — a holy mystery and a joyful promise.", date: "Oct 5, 2025", approved: false },
]

export default function AdminGuestbook() {
  return (
    <div>
      <h2 className="font-serif text-3xl text-[#5A3319] mb-1">Guestbook</h2>
      <p className="text-[#5A3319]/60 text-sm mb-8">Approve or remove messages</p>

      <div className="space-y-4">
        {entries.map((e, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-medium text-[#5A3319] text-sm">{e.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  e.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {e.approved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="text-[#5A3319]/70 text-sm">{e.message}</p>
              <p className="text-xs text-[#5A3319]/40 mt-2">{e.date}</p>
            </div>
            <div className="flex gap-2 ml-4">
              {!e.approved && (
                <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                  <Check size={16} />
                </button>
              )}
              <button className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
