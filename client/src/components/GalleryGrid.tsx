import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import {
  cover_image_1,
  cover_image_2,
  cover_image_3,
  cover_image_4,
  cover_image_5,
  cover_image_6,
} from "@/assets/images";

const photos = [
  { id: 1, album: "pre", src: cover_image_1, h: 320 },
  { id: 2, album: "engagement", src: cover_image_2, h: 420 },
  { id: 3, album: "pre", src: cover_image_3, h: 280 },
  { id: 4, album: "engagement", src: cover_image_4, h: 360 },
  { id: 5, album: "pre", src: cover_image_5, h: 400 },
  { id: 6, album: "engagement", src: cover_image_6, h: 300 },
  { id: 7, album: "pre", src: cover_image_1, h: 340 },
  { id: 8, album: "engagement", src: cover_image_2, h: 380 },
];

export default function GalleryGrid() {
  const { t } = useLang();
  const [tab, setTab] = useState<"pre" | "engagement">("pre");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = photos.filter((p) => p.album === tab);

  return (
    <div>
      <div className="flex justify-center gap-2 mb-10">
        {(["pre", "engagement"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-6 py-2 rounded-full text-sm uppercase tracking-[0.2em] transition-all ${
              tab === k
                ? "bg-[#5A3319] text-[#E5C290]"
                : "bg-[#F5ECD8] text-[#5A3319] hover:bg-[#E5C290]/40"
            }`}
          >
            {t.gallery.tabs[k]}
          </button>
        ))}
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filtered.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setLightbox(p.id)}
            className="block w-full break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group relative"
            style={{ height: p.h }}
          >
            <img
              src={p.src}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
              <Camera className="w-8 h-8 text-[#FDF8F2]/80" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white" aria-label="Close">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl rounded-2xl overflow-hidden"
            >
              <img
                src={photos.find((p) => p.id === lightbox)?.src}
                alt=""
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}