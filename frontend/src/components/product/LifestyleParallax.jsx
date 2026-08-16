import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import site from "@/config/site";
import Reveal from "@/components/Reveal";

// Lifestyle imagery with gentle scroll parallax
export const LifestyleParallax = () => {
  const d = site.product.lifestyle;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const y2 = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section ref={ref} data-testid="lifestyle-parallax">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-flame" data-testid="lifestyle-eyebrow">{d.eyebrow}</p>
      </Reveal>
      <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4">
        {d.images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.08}>
            <div className={`overflow-hidden rounded-[1.75rem] ${i === 1 ? "mt-6" : ""}`}>
              <motion.img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                style={{ y: i === 0 ? y1 : y2 }}
                className="aspect-[3/4] w-full scale-110 object-cover"
                data-testid={`lifestyle-image-${i}`}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default LifestyleParallax;
