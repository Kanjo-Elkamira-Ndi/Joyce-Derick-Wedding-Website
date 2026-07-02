import { useState, useEffect } from "react"
import { LangProvider } from "@/context/LangContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/pages/Hero"
import OurStory from "@/pages/OurStory"
import EventDetails from "@/pages/EventDetails"
import Meet from "@/pages/Meet"
import Gallery from "@/pages/Gallery"
import Rsvp from "@/pages/Rsvp"
import Guestbook from "@/pages/Guestbook"
import AdminLayout from "@/pages/admin/AdminLayout"

function WeddingSite() {
  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <EventDetails />
        <Meet />
        <Gallery />
        <Rsvp />
        <Guestbook />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const navigate = (to: string) => {
    window.history.pushState({}, "", to)
    setPath(to)
  }

  const isAdmin = path.startsWith("/admin")

  return (
    <LangProvider>
      {isAdmin ? (
        <AdminLayout path={path} navigate={navigate} />
      ) : (
        <WeddingSite />
      )}
    </LangProvider>
  )
}

export default App
