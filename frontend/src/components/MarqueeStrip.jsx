import { Star } from "lucide-react";

const MarqueeStrip = ({ items }) => {
  const loop = [...items, ...items];
  return (
    <div data-testid="social-proof-strip" className="border-y-2 border-foreground bg-accent py-3 overflow-hidden">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center font-headings font-semibold uppercase tracking-wide text-sm md:text-base">
            <span className="px-6">{item}</span>
            <Star size={16} className="fill-foreground text-foreground" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
