import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

const TARGET = new Date("2026-07-04T11:00:00+01:00").getTime();

function diff() {
  const d = TARGET - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export default function Countdown() {
  const { t } = useLang();
  const [time, setTime] = useState(diff());
  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: [number, string][] = [
    [time.days, t.hero.countdown.days],
    [time.hours, t.hero.countdown.hours],
    [time.minutes, t.hero.countdown.minutes],
    [time.seconds, t.hero.countdown.seconds],
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {items.map(([v, label]) => (
        <div key={label} className="text-center">
          <div className="font-serif text-3xl md:text-5xl text-[#E5C290] tabular-nums">
            {String(v).padStart(2, "0")}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#FDF8F2]/80 mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}