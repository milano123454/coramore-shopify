import { motion } from "framer-motion";
import { Feather, Shield, Sparkles, Magnet } from "lucide-react";
import site from "@/config/site";
import Reveal from "@/components/Reveal";

const ICONS = { feather: Feather, shield: Shield, sparkles: Sparkles, magnet: Magnet };

// Benefits with icon micro-animations and hover lift
export const BenefitsStrip = () => (
  <section className="grid grid-cols-2 gap-3 md:gap-4" data-testid="benefits-strip">
    {site.product.benefits.map((b, i) => {
      const Icon = ICONS[b.icon] || Sparkles;
      return (
        <Reveal key={b.title} delay={i * 0.07}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full rounded-2xl border border-ink/10 bg-white p-4 shadow-sm md:p-5"
            data-testid={`benefit-card-${b.icon}`}
          >
            <motion.span
              whileHover={{ rotate: [0, -12, 12, 0] }}
              transition={{ duration: 0.5 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-flame/10 text-flame"
            >
              <Icon size={18} />
            </motion.span>
            <p className="mt-3 font-display text-base font-bold">{b.title}</p>
            <p className="mt-1 text-sm leading-snug text-smoke">{b.text}</p>
          </motion.div>
        </Reveal>
      );
    })}
  </section>
);

export default BenefitsStrip;
