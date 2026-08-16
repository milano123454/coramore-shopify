import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import site from "@/config/site";

// One benefit point lighting up with scroll progress
function Benefit({ progress, range, title, text, index }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const x = useTransform(progress, range, [24, 0]);
  return (
    <motion.div style={{ opacity, x }} className="flex gap-4 border-l-2 border-flame pl-5" data-testid={`benefit-${index}`}>
      <div>
        <p className="font-display text-lg font-bold">{title}</p>
        <p className="mt-1 text-sm text-smoke">{text}</p>
      </div>
    </motion.div>
  );
}

export const HowItFeels = () => {
  const d = site.howItFeels;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The nose squashes mid-scroll and springs back — same physics feel as the hero
  const scaleX = useSpring(useTransform(scrollYProgress, [0.12, 0.42, 0.7], [1, 1.3, 0.95]), { stiffness: 130, damping: 15 });
  const scaleY = useSpring(useTransform(scrollYProgress, [0.12, 0.42, 0.7], [1, 0.55, 1.05]), { stiffness: 130, damping: 15 });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const ranges = [[0.2, 0.38], [0.42, 0.6], [0.64, 0.82]];

  return (
    <section ref={ref} id="come-si-sente" className="relative h-[220vh]" data-testid="how-it-feels-section">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-flame" data-testid="how-it-feels-eyebrow">{d.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight md:text-5xl" data-testid="how-it-feels-title">
              {d.title}
            </h2>
            {d.paragraphs.map((p, i) => (
              <p key={i} className="mt-5 max-w-md text-sm leading-relaxed text-smoke md:text-base">{p}</p>
            ))}
            <div className="mt-10 space-y-7">
              {d.benefits.map((b, i) => (
                <Benefit key={b.title} progress={scrollYProgress} range={ranges[i]} title={b.title} text={b.text} index={i} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="overflow-hidden rounded-[2.5rem]">
              <motion.img
                src={d.image}
                alt={d.imageAlt}
                style={{ y: imgY }}
                loading="lazy"
                className="aspect-[4/5] w-full scale-110 object-cover"
                data-testid="how-it-feels-image"
              />
            </div>
            {/* the squishing nose */}
            <motion.div
              style={{ scaleX, scaleY }}
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f2b3bd] to-[#e89aa4] shadow-[inset_-6px_-8px_18px_rgba(0,0,0,0.18),0_18px_40px_rgba(232,154,164,0.5)] md:h-44 md:w-44"
              data-testid="how-it-feels-nose"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-transparent to-white/50" />
            </motion.div>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-md" data-testid="how-it-feels-caption">
              Scorri per schiacciare il naso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItFeels;
