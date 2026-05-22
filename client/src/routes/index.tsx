import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/pages/Hero";
import OurStory from "@/pages/OurStory";
import EventDetails from "@/pages/EventDetails";
import Gallery from "@/pages/Gallery";
import Rsvp from "@/pages/Rsvp";
import Guestbook from "@/pages/Guestbook";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#FDF8F2]">
        <Navbar />
        <main>
          <Hero />
          <OurStory />
          <EventDetails />
          <Gallery />
          <Rsvp />
          <Guestbook />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
