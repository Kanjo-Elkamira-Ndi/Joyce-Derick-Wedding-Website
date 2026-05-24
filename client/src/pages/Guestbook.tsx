import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import GuestbookCard from "@/components/GuestbookCard";
import { useLang } from "@/context/LangContext";
import { guestbook as guestbookApi } from "@/lib/api";

interface Entry { name: string; message: string; date: string }

export default function Guestbook() {
  const { t } = useLang();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    guestbookApi.list().then((res) => {
      setEntries(
        res.data.map((e: any) => ({
          name: e.guest_name,
          message: e.message,
          date: new Date(e.created_at).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
          }),
        }))
      )
    }).catch(() => {})
  }, []);

  const all = submitted
    ? entries
    : [...entries, ...t.guestbook.seed];

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    try {
      await guestbookApi.submit(name.trim(), message.trim());
      setSubmitted(true);
      setName(""); setMessage("");
    } catch {
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <section id="guestbook" className="py-24 md:py-32 px-6 bg-[#F5ECD8]/40">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-[#E5C290] mb-3">{t.guestbook.subtitle}</p>
        <h2 className="font-serif text-5xl md:text-6xl text-[#5A3319]">{t.guestbook.title}</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="bg-[#FDF8F2] border border-[#E5C290] rounded-3xl p-8 mb-12 space-y-4"
        >
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder={t.guestbook.name}
            className="w-full px-4 py-3 rounded-lg border border-[#E5C290] bg-[#FDF8F2] focus:outline-none focus:ring-2 focus:ring-[#5A3319]/30"
          />
          <textarea
            value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder={t.guestbook.message} rows={4}
            className="w-full px-4 py-3 rounded-lg border border-[#E5C290] bg-[#FDF8F2] focus:outline-none focus:ring-2 focus:ring-[#5A3319]/30"
          />
          <button type="submit" className="w-full py-3 rounded-lg bg-[#5A3319] text-[#E5C290] uppercase tracking-[0.2em] text-sm hover:bg-[#4a2912] transition-colors">
            {t.guestbook.submit}
          </button>
        </motion.form>

        <div className="space-y-4">
          {all.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <GuestbookCard {...entry} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}