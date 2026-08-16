import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import site from "@/config/site";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

// Numbered manifesto chapters + cinematic parallax image
export const BrandStory = () => {
  const d = site.brandStory;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="bg-ink text-cream" data-testid="brand-story-section">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame" data-testid="brand-story-eyebrow">{d.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-black tracking-tight md:text-5xl" data-testid="brand-story-title">{d.title}</h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-20">
            {d.chapters.map((c, i) => (
              <Reveal key={c.num} delay={i * 0.1} className="flex gap-8">
                <span className="font-display text-6xl font-black leading-none text-cream/15 md:text-8xl" data-testid={`chapter-num-${c.num}`}>{c.num}</span>
                <div className="pt-2 md:pt-4">
                  <p className="font-display text-2xl font-bold">{c.title}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/60 md:text-base">{c.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <MagneticButton testId="brand-story-cta">
                <a href={d.cta.href} className="inline-flex h-14 items-center rounded-full bg-cream px-8 font-display text-base font-bold text-ink transition-colors duration-200 hover:bg-flame hover:text-white" data-testid="brand-story-cta-link">
                  {d.cta.label}
                </a>
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative">
            <div className="sticky top-28 overflow-hidden rounded-[2.5rem]">
              <motion.img
                src={d.image}
                alt={d.imageAlt}
                style={{ y }}
                loading="lazy"
                className="aspect-[4/5] w-full scale-110 object-cover"
                data-testid="brand-story-image"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
