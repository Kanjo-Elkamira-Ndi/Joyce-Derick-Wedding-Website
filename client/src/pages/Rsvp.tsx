import { motion } from "framer-motion";
import RsvpForm from "@/components/RsvpForm";
import { useLang } from "@/context/LangContext";

export default function Rsvp() {
  const { t } = useLang();
  return (
    <section id="rsvp" className="py-24 md:py-32 px-6 bg-[#5A3319] text-[#FDF8F2]">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-[#E5C290] mb-3">{t.rsvp.subtitle}</p>
        <h2 className="font-serif text-5xl md:text-6xl">{t.rsvp.title}</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-[#FDF8F2] rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl"
      >
        <RsvpForm />
      </motion.div>
    </section>
  );
}