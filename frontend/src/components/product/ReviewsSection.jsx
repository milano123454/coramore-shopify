import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, BadgeCheck } from "lucide-react";
import TrustpilotStars from "@/components/TrustpilotStars";
import Reveal from "@/components/Reveal";
import VideoReviews from "@/components/VideoReviews";
import site from "@/config/site";

// Trustpilot-style summary widget with distribution bars
const SummaryWidget = ({ summary }) => (
  <div className="grid gap-10 rounded-[2rem] border border-ink/10 bg-white p-8 md:grid-cols-2 md:p-12" data-testid="reviews-summary-widget">
    <div>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-trustpilot"><Star size={16} fill="#fff" strokeWidth={0} /></span>
        <span className="font-display text-lg font-black">Trustpilot</span>
      </div>
      <div className="mt-5 flex items-end gap-4">
        <span className="font-display text-6xl font-black leading-none" data-testid="reviews-average">{summary.average}</span>
        <div className="pb-1.5">
          <TrustpilotStars value={summary.average} size={15} testId="reviews-summary-stars" />
          <p className="mt-1.5 text-sm font-bold">{summary.label} · <span className="text-smoke" data-testid="reviews-total-count">{summary.count.toLocaleString("it-IT")} recensioni</span></p>
        </div>
      </div>
      <p className="mt-3 text-xs text-smoke">{summary.basedOn}</p>
    </div>
    <div className="space-y-2.5 self-center" data-testid="reviews-distribution">
      {summary.distribution.map((d) => (
        <div key={d.stars} className="flex items-center gap-3">
          <span className="flex w-8 items-center gap-1 text-xs font-bold text-smoke">{d.stars} <Star size={11} fill="#00B67A" strokeWidth={0} /></span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
            <div className="h-full rounded-full bg-trustpilot" style={{ width: `${d.pct}%` }} data-testid={`distribution-bar-${d.stars}`} />
          </div>
          <span className="w-9 text-right text-xs font-bold text-smoke">{d.pct}%</span>
        </div>
      ))}
    </div>
  </div>
);

// Text reviews carousel: arrows, dots, swipeable
const TextReviewsCarousel = ({ reviews }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const onSelect = useCallback(() => setSelected(emblaApi?.selectedScrollSnap() ?? 0), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative" data-testid="text-reviews-carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {reviews.map((r, i) => (
            <article key={i} className="min-w-0 shrink-0 grow-0 basis-[88%] rounded-[1.75rem] border border-ink/10 bg-white p-7 sm:basis-[55%] lg:basis-[38%]" data-testid={`text-review-${i}`}>
              <div className="flex items-center justify-between">
                <TrustpilotStars value={r.stars} size={12} gap={2} />
                <time className="text-xs font-semibold text-smoke">{r.date}</time>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{r.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-smoke">{r.body}</p>
              <footer className="mt-5 flex items-center gap-2 text-sm font-bold">
                {r.name}
                {r.verified && (
                  <span className="flex items-center gap-1 text-xs font-bold text-trustpilot" data-testid={`verified-badge-${i}`}>
                    <BadgeCheck size={14} /> Verificata
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <div className="flex gap-1.5" data-testid="text-reviews-dots">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Vai alla recensione ${i + 1}`}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 ${selected === i ? "w-7 bg-flame" : "w-2 bg-ink/15"}`}
              data-testid={`text-reviews-dot-${i}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => emblaApi?.scrollPrev()} className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-ink hover:text-white" aria-label="Recensioni precedenti" data-testid="text-reviews-prev"><ChevronLeft size={18} /></button>
          <button onClick={() => emblaApi?.scrollNext()} className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-ink hover:text-white" aria-label="Recensioni successive" data-testid="text-reviews-next"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export const ReviewsSection = () => {
  const r = site.product.reviewsSection;
  return (
    <div id="recensioni" className="scroll-mt-24">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24" data-testid="reviews-section">
        <Reveal>
          <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl" data-testid="reviews-heading">{r.heading}</h2>
          <p className="mt-3 text-sm text-smoke md:text-base">{r.subheading}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <SummaryWidget summary={r.summary} />
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <TextReviewsCarousel reviews={r.textReviews} />
        </Reveal>
      </section>
      <VideoReviews data={site.videoReviews} />
    </div>
  );
};

export default ReviewsSection;
