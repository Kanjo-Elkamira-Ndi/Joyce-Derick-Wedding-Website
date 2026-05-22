import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

const links = [
  { id: "story", key: "story" as const },
  { id: "event", key: "event" as const },
  { id: "gallery", key: "gallery" as const },
  { id: "rsvp", key: "rsvp" as const },
  { id: "guestbook", key: "guestbook" as const },
];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FDF8F2]/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#hero" className="font-serif text-2xl md:text-3xl tracking-wide" style={{ color: scrolled ? "#5A3319" : "#FDF8F2" }}>
          J <span className="text-[#E5C290]">&</span> D
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-sm uppercase tracking-[0.18em] transition-colors hover:text-[#E5C290]"
                style={{ color: scrolled ? "#5A3319" : "#FDF8F2" }}
              >
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="px-3 py-1 rounded-full border text-xs uppercase tracking-wider transition-colors"
            style={{
              borderColor: scrolled ? "#5A3319" : "#FDF8F2",
              color: scrolled ? "#5A3319" : "#FDF8F2",
            }}
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(true)}
            style={{ color: scrolled ? "#5A3319" : "#FDF8F2" }}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-72 bg-[#FDF8F2] z-50 shadow-2xl p-8"
          >
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-[#5A3319]" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
            <div className="mt-12 flex flex-col gap-6">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl text-[#5A3319] hover:text-[#E5C290]"
                >
                  {t.nav[l.key]}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}