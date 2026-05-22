import { useState, FormEvent } from "react";
import { useLang } from "@/context/LangContext";

export default function RsvpForm() {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "", email: "", attending: "yes", meal: "beef", plusOne: "", diet: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("RSVP:", form);
    alert("Merci! / Thank you!");
  };

  const waMsg = encodeURIComponent(`RSVP — ${form.name || "Guest"}: ${form.attending === "yes" ? "Attending" : "Not attending"}`);
  const waLink = `https://wa.me/237600000000?text=${waMsg}`;

  const input = "w-full px-4 py-3 rounded-lg border border-[#E5C290] bg-[#FDF8F2] text-[#2a1810] focus:outline-none focus:ring-2 focus:ring-[#5A3319]/30";
  const label = "block text-xs uppercase tracking-[0.18em] text-[#5A3319] mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-xl mx-auto">
      <div>
        <label className={label}>{t.rsvp.name}</label>
        <input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className={label}>{t.rsvp.email}</label>
        <input type="email" required className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label className={label}>{t.rsvp.attending}</label>
        <div className="flex gap-6">
          {(["yes", "no"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="attending" value={v} checked={form.attending === v}
                onChange={(e) => setForm({ ...form, attending: e.target.value })}
                className="accent-[#5A3319]" />
              <span className="text-[#5A3319]">{v === "yes" ? t.rsvp.yes : t.rsvp.no}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className={label}>{t.rsvp.meal}</label>
        <select className={input} value={form.meal} onChange={(e) => setForm({ ...form, meal: e.target.value })}>
          <option value="beef">{t.rsvp.beef}</option>
          <option value="fish">{t.rsvp.fish}</option>
          <option value="veg">{t.rsvp.veg}</option>
        </select>
      </div>
      <div>
        <label className={label}>{t.rsvp.plusOne}</label>
        <input className={input} value={form.plusOne} onChange={(e) => setForm({ ...form, plusOne: e.target.value })} />
      </div>
      <div>
        <label className={label}>{t.rsvp.diet}</label>
        <textarea rows={3} className={input} value={form.diet} onChange={(e) => setForm({ ...form, diet: e.target.value })} />
      </div>
      <button type="submit"
        className="w-full py-4 rounded-lg bg-[#5A3319] text-[#E5C290] font-medium tracking-[0.2em] uppercase text-sm hover:bg-[#4a2912] transition-colors">
        {t.rsvp.submit}
      </button>
      <a href={waLink} target="_blank" rel="noopener noreferrer"
        className="block w-full text-center py-4 rounded-lg bg-[#25D366] text-white font-medium tracking-wider hover:bg-[#1ebe5a] transition-colors">
        {t.rsvp.whatsapp}
      </a>
    </form>
  );
}