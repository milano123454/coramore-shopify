import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import site from "@/config/site";
import Reveal from "@/components/Reveal";

const POS = [
  { dx: "-68%", dy: "-66%", r: -7 },
  { dx: "-50%", dy: "-50%", r: -1 },
  { dx: "-32%", dy: "-34%", r: 6 },
];

// Exploded/layered case view with clickable hotspots
export const HowItsMade = ({ variant }) => {
  const d = site.product.howItsMade;
  const [activeId, setActiveId] = useState(d.layers[0].id);
  const active = d.layers.find((l) => l.id === activeId);

  const layerFace = (id) => {
    if (id === "shell") {
      return <img src={variant.image} alt="" loading="lazy" className="h-full w-full object-cover" />;
    }
    if (id === "bumper") {
      return <span className="block h-full w-full rounded-[1.4rem] border-[10px] border-ink/75 bg-transparent" />;
    }
    return (
      <span className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-[2px]">
        <span
          className="block h-16 w-16 rounded-full shadow-[inset_-4px_-6px_12px_rgba(0,0,0,0.15)] sm:h-20 sm:w-20"
          style={{ background: "linear-gradient(135deg, rgb(var(--sc-nose-from)), rgb(var(--sc-nose-to)))" }}
        />
      </span>
    );
  };

  return (
    <section data-testid="how-its-made">
      <Reveal>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-flame" data-testid="how-its-made-eyebrow">{d.eyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-black tracking-tight md:text-3xl" data-testid="how-its-made-title">{d.title}</h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-8 h-[300px] w-full sm:h-[380px]">
          {d.layers.map((l, i) => {
            const isActive = activeId === l.id;
            return (
              <motion.button
                key={l.id}
                onClick={() => setActiveId(l.id)}
                animate={{ scale: isActive ? 1.04 : 1, rotate: POS[i].r }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className={`absolute left-1/2 top-1/2 h-[70%] w-[54%] overflow-hidden rounded-[1.6rem] border shadow-lg transition-[border-color,box-shadow] duration-300 ${l.id === "bumper" ? "bg-transparent" : "bg-white"} ${isActive ? "border-flame ring-2 ring-flame/40" : "border-ink/10"}`}
                style={{ translate: `${POS[i].dx} ${POS[i].dy}`, zIndex: isActive ? 10 : 3 - i }}
                aria-label={l.title}
                data-testid={`layer-${l.id}`}
              >
                {layerFace(l.id)}
                <span className={`hotspot-pulse absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full text-white ${isActive ? "bg-flame" : "bg-ink/70"}`}>
                  <Plus size={15} strokeWidth={3} />
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {d.layers.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveId(l.id)}
              className={`rounded-full border px-4 py-2.5 text-sm font-bold transition-colors duration-200 ${activeId === l.id ? "border-flame bg-flame text-white" : "border-ink/15 bg-white text-smoke hover:border-flame hover:text-flame"}`}
              data-testid={`layer-tab-${l.id}`}
            >
              {l.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-6 rounded-2xl border border-ink/10 bg-white p-5"
            data-testid="layer-caption"
          >
            <p className="font-display text-lg font-bold">{active.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-smoke">{active.caption}</p>
          </motion.div>
        </AnimatePresence>
      </Reveal>
    </section>
  );
};

export default HowItsMade;
