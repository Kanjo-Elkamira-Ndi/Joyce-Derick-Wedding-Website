import { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import AdminLogin from "./AdminLogin"
import AdminDashboard from "./AdminDashboard"
import AdminGallery from "./AdminGallery"
import AdminRsvp from "./AdminRsvp"
import AdminGuestbook from "./AdminGuestbook"

export default function AdminLayout({
  path,
  navigate,
}: {
  path: string
  navigate: (to: string) => void
}) {
  const authed = sessionStorage.getItem("admin_token")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!authed) {
    return <AdminLogin onLogin={() => navigate("/admin/dashboard")} />
  }

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/gallery", label: "Gallery" },
    { href: "/admin/rsvp", label: "RSVP" },
    { href: "/admin/guestbook", label: "Guestbook" },
  ]

  const section = path.replace("/admin/", "") || "dashboard"

  const NavLinks = () => (
    <>
      <div className="px-6 pt-8 pb-6">
        <h1 className="font-serif text-2xl">J & D</h1>
        <p className="text-xs tracking-[0.2em] uppercase mt-1 text-[#E5C290]/60">Admin</p>
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {links.map((l) => (
          <button
            key={l.href}
            onClick={() => {
              navigate(l.href)
              setSidebarOpen(false)
            }}
            className={`text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
              path === l.href
                ? "bg-[#E5C290] text-[#5A3319] font-medium"
                : "text-[#E5C290]/70 hover:text-[#E5C290] hover:bg-[#E5C290]/10"
            }`}
          >
            {l.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto px-6 py-6">
        <button
          onClick={() => {
            sessionStorage.removeItem("admin_token")
            navigate("/admin")
          }}
          className="flex items-center gap-2 text-sm text-[#E5C290]/50 hover:text-[#E5C290] transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#F5ECD8] flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-[#5A3319] px-4 py-3">
        <div>
          <h1 className="font-serif text-lg text-[#E5C290]">J & D</h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#E5C290]/60">Admin</p>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-[#E5C290] p-1"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-56 bg-[#5A3319] text-[#E5C290]">
        <NavLinks />
      </aside>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#5A3319] text-[#E5C290] flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)} className="text-[#E5C290]">
            <X size={20} />
          </button>
        </div>
        <NavLinks />
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {section === "dashboard" && <AdminDashboard />}
        {section === "gallery" && <AdminGallery />}
        {section === "rsvp" && <AdminRsvp />}
        {section === "guestbook" && <AdminGuestbook />}
      </main>
    </div>
  )
}
