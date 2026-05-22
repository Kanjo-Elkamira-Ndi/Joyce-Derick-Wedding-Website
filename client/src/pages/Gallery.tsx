import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import GalleryGrid from "@/components/GalleryGrid";
import { useLang } from "@/context/LangContext";

export default function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-6 bg-[#FDF8F2] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #5A3319 0%, transparent 70%)",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-[#E5C290] mb-3">{t.gallery.subtitle}</p>
        <h2 className="font-serif text-5xl md:text-6xl text-[#5A3319]">{t.gallery.title}</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <GalleryGrid />
        <div className="mt-12 text-center">
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-3 rounded-full border border-[#5A3319] text-[#5A3319] text-xs uppercase tracking-[0.25em] hover:bg-[#5A3319] hover:text-[#E5C290] transition-colors"
          >
            {t.gallery.submit}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FDF8F2] rounded-3xl p-8 max-w-md w-full relative"
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-[#5A3319]" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-serif text-2xl text-[#5A3319] mb-2">{t.gallery.modalTitle}</h3>
              <p className="text-sm text-[#5A3319]/70 mb-6">{t.gallery.modalDesc}</p>
              <input type="file" accept="image/*" multiple className="w-full text-sm text-[#5A3319] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#5A3319] file:text-[#E5C290] file:cursor-pointer" />
              <button onClick={() => setOpen(false)} className="mt-6 w-full py-3 rounded-full bg-[#5A3319] text-[#E5C290] text-xs uppercase tracking-[0.25em]">
                {t.gallery.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}