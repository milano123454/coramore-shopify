import { Sparkle } from "lucide-react";

// Slow editorial marquee ribbon
export const Marquee = ({ items, className = "" }) => (
  <div className={`overflow-hidden border-y border-ink/10 bg-sand/70 py-6 md:py-8 ${className}`} data-testid="editorial-marquee">
    <div className="marquee-track flex w-max items-center gap-12 md:gap-20">
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-xl font-bold uppercase tracking-tight text-ink/70 md:gap-20 md:text-3xl">
          {item}
          <Sparkle size={18} className="text-flame" fill="#F2542D" />
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
