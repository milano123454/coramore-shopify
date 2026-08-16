import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Truck, RotateCcw, Lock, Zap, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import site from "@/config/site";
import { useCart, formatPrice } from "@/context/CartContext";
import TrustpilotStars from "@/components/TrustpilotStars";
import MagneticButton from "@/components/MagneticButton";
import CouponCard from "@/components/product/CouponCard";
import ModelSelector from "@/components/product/ModelSelector";
import VariantSelector from "@/components/product/VariantSelector";
import DeliveryEstimate from "@/components/product/DeliveryEstimate";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BADGE_ICONS = { truck: Truck, rotate: RotateCcw, lock: Lock, zap: Zap };

const scrollToReviews = () => {
  if (window.__lenis) window.__lenis.scrollTo("#recensioni", { offset: -80 });
  else document.querySelector("#recensioni")?.scrollIntoView({ behavior: "smooth" });
};

export const BuyBox = ({ variant, onVariantChange, model, onModelChange }) => {
  const p = site.product;
  const b = p.buyBox;
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const discount = Math.round((1 - p.price.current / p.price.original) * 100);
  const installment = formatPrice(p.price.current / p.klarna.installments);

  const tryAdd = (thenCheckout) => {
    if (!variant.inStock) return;
    if (!model) {
      toast.error("Seleziona prima il modello del tuo telefono");
      document.querySelector('[data-testid="model-selector"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addItem({ productSlug: p.slug, variantId: variant.id, variantName: variant.name, model, qty, price: p.price.current, image: variant.image });
    toast.success(b.addedToast);
    if (thenCheckout) toast.info(b.checkoutToast);
  };

  return (
    <div className="space-y-7" data-testid="buy-box">
      {/* 1 — Title */}
      <div>
        <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl" data-testid="product-title">{p.title}</h1>
        <p className="mt-2 text-sm font-semibold text-smoke">{p.subtitle} · {variant.name}</p>
      </div>

      {/* 2 — Trustpilot rating row */}
      <button onClick={scrollToReviews} className="flex items-center gap-3 transition-opacity hover:opacity-75" data-testid="rating-row" aria-label="Vai alle recensioni">
        <TrustpilotStars value={p.rating.average} size={14} />
        <span className="text-sm font-bold">{p.rating.average}</span>
        <span className="text-sm font-semibold text-smoke underline underline-offset-4">
          {p.rating.count.toLocaleString("it-IT")} recensioni · {p.rating.label}
        </span>
      </button>

      {/* 3 — Price block */}
      <div className="flex items-center gap-4" data-testid="price-block">
        <span className="font-display text-4xl font-black tracking-tight text-flame" data-testid="price-current">{formatPrice(p.price.current)}</span>
        <span className="text-xl font-semibold text-smoke line-through" data-testid="price-original">{formatPrice(p.price.original)}</span>
        <span className="rounded-full bg-flame px-3 py-1 text-sm font-black text-white" data-testid="price-discount-badge">−{discount}%</span>
      </div>

      {/* 4 — Klarna instalments */}
      <p className="flex flex-wrap items-center gap-1.5 text-sm text-smoke" data-testid="klarna-line">
        {p.klarna.text.replace("{n}", p.klarna.installments).replace("{amount}", installment)}
        <span className="rounded-md bg-klarna px-2 py-0.5 font-display text-sm font-black text-ink" data-testid="klarna-logo">Klarna.</span>
      </p>

      {/* 5 — Coupon card */}
      <CouponCard coupon={p.coupon} />

      {/* 6 — Model selector */}
      <ModelSelector config={p.models} selected={model} onSelect={onModelChange} />

      {/* 7 — Variant swatches */}
      <VariantSelector variants={p.variants} selected={variant} onSelect={onVariantChange} label={b.variantLabel} />

      {/* 8 — Quantity + buy buttons */}
      <div className="space-y-3">
        <p className="text-sm font-bold">{b.quantityLabel}</p>
        <div className="flex gap-3">
          <div className="flex items-center rounded-full border border-ink/15 bg-white px-1" data-testid="quantity-selector">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-11 w-11 items-center justify-center" aria-label="Diminuisci quantità" data-testid="qty-minus"><Minus size={16} /></button>
            <span className="w-6 text-center font-display text-lg font-black" data-testid="qty-value">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="flex h-11 w-11 items-center justify-center" aria-label="Aumenta quantità" data-testid="qty-plus"><Plus size={16} /></button>
          </div>
          <MagneticButton className="flex-1" testId="buy-now-magnetic">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => tryAdd(true)}
              disabled={!variant.inStock}
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-cta font-display text-lg font-bold text-white shadow-cta transition-colors duration-200 hover:bg-cta-dark disabled:bg-ink/30 disabled:shadow-none"
              data-testid="buy-now-button"
            >
              {variant.inStock ? b.buyNowLabel : b.soldOutLabel}
            </motion.button>
          </MagneticButton>
        </div>
        <button
          onClick={() => tryAdd(false)}
          disabled={!variant.inStock}
          className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full border-2 border-ink font-display text-base font-bold transition-colors duration-200 hover:bg-ink hover:text-white disabled:border-ink/20 disabled:text-ink/30"
          data-testid="add-to-cart-button"
        >
          <ShoppingBag size={18} /> {b.addToCartLabel}
        </button>
      </div>

      {/* 10 — Trust badges grid */}
      <div className="grid grid-cols-2 gap-3" data-testid="trust-badges-grid">
        {p.trustBadges.map((t) => {
          const Icon = BADGE_ICONS[t.icon] || Truck;
          return (
            <div key={t.label} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5" data-testid={`trust-badge-${t.icon}`}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream"><Icon size={16} /></span>
              <span className="text-xs font-bold leading-tight">{t.label}</span>
            </div>
          );
        })}
      </div>

      {/* 11 — Delivery estimate */}
      <DeliveryEstimate cfg={p.delivery} />

      {/* 12 — Accordions */}
      <Accordion type="single" collapsible className="space-y-2" data-testid="product-accordions">
        {p.accordions.map((a, i) => (
          <AccordionItem key={a.title} value={`item-${i}`} className="rounded-2xl border border-ink/10 bg-white px-5">
            <AccordionTrigger className="py-4 text-left font-display text-base font-bold hover:no-underline" data-testid={`accordion-trigger-${i}`}>
              {a.title}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-smoke" data-testid={`accordion-content-${i}`}>
              {a.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default BuyBox;
