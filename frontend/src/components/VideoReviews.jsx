import { useRef, useState } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import TrustpilotStars from "@/components/TrustpilotStars";
import Reveal from "@/components/Reveal";

// Horizontally scrollable 9:16 video review cards + fullscreen player
export const VideoReviews = ({ data, eyebrowColor = "text-flame" }) => {
  const [active, setActive] = useState(null);
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-28" data-testid="video-reviews-section">
      <Reveal>
        <p className={`text-xs font-bold uppercase tracking-[0.25em] ${eyebrowColor}`} data-testid="video-reviews-eyebrow">{data.eyebrow}</p>
        <div className="mt-3 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl" data-testid="video-reviews-heading">{data.heading}</h2>
            <p className="mt-3 max-w-md text-sm text-smoke md:text-base">{data.subheading}</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scrollBy(-1)} className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-ink hover:text-white" aria-label="Video precedenti" data-testid="video-reviews-prev"><ChevronLeft size={18} /></button>
            <button onClick={() => scrollBy(1)} className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-ink hover:text-white" aria-label="Video successivi" data-testid="video-reviews-next"><ChevronRight size={18} /></button>
          </div>
        </div>
      </Reveal>

      <div ref={trackRef} className="scrollbar-hide -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10" data-testid="video-reviews-track">
        {data.items.map((v, i) => (
          <button
            key={i}
            onClick={() => setActive(v)}
            className="group relative aspect-[9/16] w-[62vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink text-left sm:w-64 md:w-72"
            data-testid={`video-review-card-${i}`}
          >
            <img src={v.thumb} alt={`Video recensione di ${v.name}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
              <Play size={24} fill="#fff" color="#fff" className="ml-1" />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5">
              <TrustpilotStars value={v.stars} size={12} gap={2} />
              <span className="mt-2 block font-display text-lg font-bold text-white">{v.name}</span>
              <span className="block text-xs leading-snug text-white/70">{v.quote}</span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="video-player-modal" onClick={() => setActive(null)}>
          <div className="relative w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActive(null)} className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-flame" aria-label="Chiudi video" data-testid="video-player-close">
              <X size={20} />
            </button>
            <video src={active.video} controls autoPlay className="aspect-[9/16] w-full rounded-3xl bg-black object-cover" data-testid="video-player" />
            <p className="mt-4 text-center text-sm font-bold text-white">{active.name} · {active.quote}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoReviews;
