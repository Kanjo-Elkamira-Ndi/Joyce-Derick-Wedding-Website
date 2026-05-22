import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-[#5A3319] text-[#FDF8F2] py-12 text-center">
      <div className="font-serif text-3xl mb-2">J <span className="text-[#E5C290]">&</span> D</div>
      <p className="text-sm tracking-[0.2em] uppercase text-[#E5C290]">{t.footer}</p>
      <p className="text-xs mt-4 text-[#FDF8F2]/60">14.12.2025 · Yaoundé</p>
    </footer>
  );
}