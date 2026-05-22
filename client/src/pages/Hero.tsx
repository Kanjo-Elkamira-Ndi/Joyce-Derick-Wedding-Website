import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Countdown from "@/components/Countdown";
import { useLang } from "@/context/LangContext";

const slides = [
  "radial-gradient(circle at 30% 40%, #8b5a3c 0%, #5A3319 60%, #2a1810 100%)",
  "linear-gradient(135deg, #5A3319 0%, #E5C290 100%)",
  "radial-gradient(circle at 70% 60%, #E5C290 0%, #8b5a3c 50%, #5A3319 100%)",
  "linear-gradient(160deg, #2a1810 0%, #5A3319 50%, #E5C290 100%)",
  "radial-gradient(ellipse at center, #8b5a3c 0%, #5A3319 70%, #1a0e07 100%)",
];

export default function Hero() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {slides.map((bg, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{ background: bg, transform: `translateY(${scrollY * 0.35}px) scale(${1 + scrollY * 0.0005})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className="text-[#E5C290] text-sm md:text-base uppercase tracking-[0.4em] mb-6"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#FDF8F2] font-light"
        >
          {t.hero.names}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 mb-12 text-[#FDF8F2]/90 text-base md:text-lg tracking-[0.2em] uppercase"
        >
          {t.hero.date}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
        >
          <Countdown />
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-[#E5C290]" : "w-2 bg-[#FDF8F2]/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.a
        href="#story"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-20 right-8 hidden md:flex flex-col items-center gap-2 text-[#FDF8F2]/70 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <ChevronDown className="w-4 h-4" />
      </motion.a>
    </section>
  );
}