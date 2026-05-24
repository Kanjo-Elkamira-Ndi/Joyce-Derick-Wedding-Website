import { Download } from "lucide-react"

export default function AdminRsvp() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#5A3319] mb-1">RSVP List</h2>
          <p className="text-[#5A3319]/60 text-sm">Guest responses</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#5A3319] text-[#5A3319] rounded-lg text-sm hover:bg-[#5A3319]/5 transition-colors w-full sm:w-auto">
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#E5C290]/10">
              <td colSpan={4} className="px-4 md:px-6 py-8 text-center text-[#5A3319]/40">
                No RSVPs yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
