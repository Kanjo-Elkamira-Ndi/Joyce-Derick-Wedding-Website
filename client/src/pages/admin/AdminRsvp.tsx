import { Download } from "lucide-react"

export default function AdminRsvp() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-3xl text-[#5A3319] mb-1">RSVP List</h2>
          <p className="text-[#5A3319]/60 text-sm">Guest responses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#5A3319] text-[#5A3319] rounded-lg text-sm hover:bg-[#5A3319]/5 transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5C290]/30">
              <th className="text-left px-6 py-3 text-[#5A3319]/60 font-medium">Name</th>
              <th className="text-left px-6 py-3 text-[#5A3319]/60 font-medium">Email</th>
              <th className="text-left px-6 py-3 text-[#5A3319]/60 font-medium">Attending</th>
              <th className="text-left px-6 py-3 text-[#5A3319]/60 font-medium">Meal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#E5C290]/10">
              <td colSpan={4} className="px-6 py-8 text-center text-[#5A3319]/40">
                No RSVPs yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
