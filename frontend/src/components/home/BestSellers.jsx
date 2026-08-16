import { useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import site from "@/config/site";
import TrustpilotStars from "@/components/TrustpilotStars";
import Reveal from "@/components/Reveal";
import { formatPrice } from "@/context/CartContext";

// Product card with hover 3D tilt
export const ProductCard = ({ variant, price }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const discount = Math.round((1 - price.current / price.original) * 100);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({ ry: ((e.clientX - r.left) / r.width - 0.5) * 12, rx: -((e.clientY - r.top) / r.height - 0.5) * 12 });
  };

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        className="group h-full rounded-[1.75rem] border border-ink/5 bg-white p-3 shadow-sm"
        data-testid={`product-card-${variant.id}`}
      >
        <Link to={`/prodotto/${variant.id}`} className="block">
          <div className="relative overflow-hidden rounded-[1.25rem]">
            <img src={variant.image} alt={`Cover ${variant.name} con nasino 3D`} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute left-3 top-3 rounded-full bg-flame px-3 py-1 text-xs font-black text-white" data-testid={`product-badge-${variant.id}`}>
              −{discount}%
            </span>
            {!variant.inStock && (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/50 font-display text-lg font-bold text-white backdrop-blur-[2px]">
                Esaurito
              </span>
            )}
          </div>
          <div className="px-2 pb-2 pt-4">
            <p className="font-display text-xl font-bold tracking-tight">{variant.name}</p>
            <div className="mt-2 flex items-center gap-2">
              <TrustpilotStars value={variant.rating} size={10} gap={2} />
              <span className="text-xs font-semibold text-smoke">{variant.rating} ({variant.reviewsCount})</span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl font-black" data-testid={`product-price-${variant.id}`}>{formatPrice(price.current)}</span>
              <span className="text-sm font-semibold text-smoke line-through">{formatPrice(price.original)}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export const BestSellers = () => {
  const d = site.bestSellers;
  const p = site.product;
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const variants = p.bestSellerIds.map((id) => p.variants.find((v) => v.id === id)).filter(Boolean);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="best-sellers" className="container-sc py-16 md:py-28" data-testid="best-sellers-section">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-flame" data-testid="best-sellers-eyebrow">{d.eyebrow}</p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight md:text-5xl" data-testid="best-sellers-title">{d.title}</h2>
            <p className="mt-3 text-sm text-smoke md:text-base">{d.subtitle}</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={prev} className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-ink hover:text-white" aria-label="Prodotti precedenti" data-testid="best-sellers-prev"><ChevronLeft size={18} /></button>
            <button onClick={next} className="rounded-full border border-ink/15 p-3 transition-colors hover:bg-ink hover:text-white" aria-label="Prodotti successivi" data-testid="best-sellers-next"><ChevronRight size={18} /></button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 overflow-hidden" ref={emblaRef} data-testid="best-sellers-carousel">
          <div className="flex gap-5">
            {variants.map((v) => (
              <div key={v.id} className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[46%] lg:basis-[31.5%]">
                <ProductCard variant={v} price={p.price} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default BestSellers;
