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

  return (
    <div className="min-h-screen bg-[#F5ECD8] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#5A3319] text-[#E5C290] flex flex-col">
        <div className="px-6 py-8">
          <h1 className="font-serif text-2xl">J & D</h1>
          <p className="text-xs tracking-[0.2em] uppercase mt-1 text-[#E5C290]/60">Admin</p>
        </div>
        <nav className="flex flex-col gap-1 px-4">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => navigate(l.href)}
              className={`text-left px-4 py-2 rounded-lg text-sm transition-colors ${
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
            className="text-sm text-[#E5C290]/50 hover:text-[#E5C290] transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {section === "dashboard" && <AdminDashboard />}
        {section === "gallery" && <AdminGallery />}
        {section === "rsvp" && <AdminRsvp />}
        {section === "guestbook" && <AdminGuestbook />}
      </main>
    </div>
  )
}
