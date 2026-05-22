interface Props {
  name: string;
  message: string;
  date: string;
}

export default function GuestbookCard({ name, message, date }: Props) {
  return (
    <div className="bg-[#FDF8F2] border border-[#E5C290]/50 rounded-2xl p-6 shadow-sm">
      <p className="font-serif text-lg text-[#5A3319] italic leading-relaxed">"{message}"</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium text-[#5A3319]">{name}</span>
        <span className="text-[#5A3319]/60 text-xs uppercase tracking-wider">{date}</span>
      </div>
    </div>
  );
}