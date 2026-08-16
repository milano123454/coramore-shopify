import { motion } from "framer-motion";
import site from "@/config/site";
import Case3D from "@/components/Case3D";
import MagneticButton from "@/components/MagneticButton";
import TrustpilotStars from "@/components/TrustpilotStars";

// Masked line-by-line title reveal
function HeroTitle({ lines }) {
  return (
    <h1 className="font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl" data-testid="hero-title">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25 + i * 0.16, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {i === 0 ? line : <span className="text-flame">{line}</span>}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export const Hero3D = () => {
  const h = site.hero;
  const m = h.model3d;

  return (
    <section className="relative overflow-hidden" data-testid="hero-section">
      <div className="container-sc grid items-center gap-6 pt-24 lg:min-h-screen lg:grid-cols-2 lg:gap-2 lg:pt-16">
        <div className="relative z-10 min-w-0 py-10 lg:py-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-sm font-bold uppercase tracking-[0.25em] text-flame"
            data-testid="hero-eyebrow"
          >
            {h.eyebrow}
          </motion.p>
          <div className="mt-5">
            <HeroTitle lines={h.titleLines} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-md text-base leading-relaxed text-smoke md:text-lg"
            data-testid="hero-subtitle"
          >
            {h.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton testId="hero-cta-primary">
              <a href={h.ctaPrimary.href} className="flex h-14 items-center rounded-full bg-cta px-8 font-display text-base font-bold text-white shadow-cta transition-colors duration-200 hover:bg-cta-dark" data-testid="hero-cta-primary-link">
                {h.ctaPrimary.label}
              </a>
            </MagneticButton>
            <a href={h.ctaSecondary.href} className="flex h-14 items-center rounded-full border border-ink/15 px-8 text-sm font-bold transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white" data-testid="hero-cta-secondary">
              {h.ctaSecondary.label}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-8 flex items-center gap-3"
            data-testid="hero-rating-note"
          >
            <TrustpilotStars value={h.ratingNote.average} size={12} gap={2} />
            <p className="text-sm font-semibold text-smoke">
              <span className="font-black text-ink">{h.ratingNote.average}</span> · {h.ratingNote.count.toLocaleString("it-IT")} {h.ratingNote.text}
            </p>
          </motion.div>
        </div>

        <div className="relative h-[62vh] min-h-[420px] min-w-0 lg:h-[88vh]" data-testid="hero-3d-canvas">
          <Case3D
            textureUrl={m.textureUrl}
            caseColor={m.caseColor}
            nose={m.nose}
            cameraZ={10.4}
            placeholder={m.textureUrl}
            alt="Cover SqueezeCase in 3D"
            hint={h.hint}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
