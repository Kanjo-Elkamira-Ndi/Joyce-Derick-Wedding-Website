import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function OurStory() {
  const { t } = useLang();
  return (
    <section id="story" className="py-24 md:py-32 px-6 bg-[#FDF8F2]">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-[#E5C290] mb-3">{t.story.subtitle}</p>
        <h2 className="font-serif text-5xl md:text-6xl text-[#5A3319]">{t.story.title}</h2>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E5C290]" />
        <div className="space-y-16">
          {t.story.items.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${left ? "" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#E5C290] ring-4 ring-[#FDF8F2]" />
                <div className={`pl-12 md:pl-0 md:w-1/2 ${left ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#5A3319]/60 mb-2">{item.date}</p>
                  <h3 className="font-serif text-3xl text-[#5A3319] mb-3">{item.title}</h3>
                  <p className="text-[#5A3319]/80 leading-relaxed">{item.desc}</p>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}