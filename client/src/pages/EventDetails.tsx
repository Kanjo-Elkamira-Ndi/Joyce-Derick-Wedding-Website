import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function EventDetails() {
  const { t } = useLang();
  const events = [t.event.traditional, t.event.reception, t.event.court];

  return (
    <section id="event" className="py-24 md:py-32 px-6 bg-[#F5ECD8]/60">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-[#E5C290] mb-3">{t.event.subtitle}</p>
        <h2 className="font-serif text-5xl md:text-6xl text-[#5A3319]">{t.event.title}</h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {events.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-[#FDF8F2] border border-[#E5C290] rounded-3xl p-10 text-center shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#E5C290] mb-4">{e.label}</p>
            <h3 className="font-serif text-3xl text-[#5A3319] mb-6">{e.venue}</h3>
            <div className="flex flex-col items-center gap-3 text-[#5A3319]/80 mb-8">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#E5C290]" />{e.address}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#E5C290]" />{e.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-16 bg-[#FDF8F2] border border-[#E5C290] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p className="font-serif text-2xl text-[#5A3319]">{t.event.dressCode}</p>
        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full shadow-inner" style={{ backgroundColor: "#5A3319" }} />
            <span className="text-sm text-[#5A3319]">{t.event.brown}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full shadow-inner" style={{ backgroundColor: "#E5C290" }} />
            <span className="text-sm text-[#5A3319]">{t.event.gold}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}