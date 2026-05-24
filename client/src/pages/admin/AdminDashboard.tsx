export default function AdminDashboard() {
  return (
    <div>
      <h2 className="font-serif text-3xl text-[#5A3319] mb-2">Dashboard</h2>
      <p className="text-[#5A3319]/60 text-sm mb-8">Overview of your wedding site</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#5A3319]/50 mb-1">RSVPs</p>
          <p className="font-serif text-4xl text-[#5A3319]">0</p>
          <p className="text-xs text-[#5A3319]/40 mt-1">responses received</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#5A3319]/50 mb-1">Gallery</p>
          <p className="font-serif text-4xl text-[#5A3319]">6</p>
          <p className="text-xs text-[#5A3319]/40 mt-1">photos uploaded</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-xs uppercase tracking-widest text-[#5A3319]/50 mb-1">Guestbook</p>
          <p className="font-serif text-4xl text-[#5A3319]">3</p>
          <p className="text-xs text-[#5A3319]/40 mt-1">messages</p>
        </div>
      </div>
    </div>
  )
}
