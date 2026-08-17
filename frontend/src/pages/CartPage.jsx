import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gift, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getContent } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import CartLineItem from "@/components/CartLineItem";
import FreeShippingBar from "@/components/FreeShippingBar";
import CouponBanner from "@/components/CouponBanner";
import DeliveryCountdown from "@/components/DeliveryCountdown";
import Stars from "@/components/Stars";

const TRUST_ICONS = { truck: Truck, shield: ShieldCheck, refresh: RotateCcw };
const pad = (n) => String(n).padStart(2, "0");

const CartPage = () => {
  const {
    items, count, subtotal, setQty, removeItem,
    couponApplied, applyCoupon, upsellClaimed, toggleUpsell,
  } = useCart();
  const [content, setContent] = useState(null);
  const [upsellLeft, setUpsellLeft] = useState(null);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
  }, []);

  useEffect(() => {
    if (!content?.cart?.upsell?.enabled) return;
    setUpsellLeft(content.cart.upsell.minutes * 60);
    const id = setInterval(() => setUpsellLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [content]);

  if (!content) {
    return (
      <div data-testid="cart-loading" className="min-h-[60vh] flex items-center justify-center font-headings text-2xl font-semibold">
        squeezing…
      </div>
    );
  }

  const { coupon, delivery, cart: cartCfg } = content;
  const upsell = cartCfg.upsell;
  const currency = items[0]?.currency || content.products[0].currency;
  const discount = couponApplied ? subtotal * (coupon.percent / 100) : 0;
  const total = subtotal - discount;
  const freeShip = subtotal >= cartCfg.freeShippingThreshold;
  const upsellExpired = upsellLeft === 0;

  const checkout = () => {
    if (cartCfg.checkoutUrl) {
      window.location.href = cartCfg.checkoutUrl;
    } else {
      toast.info("Checkout is a demo for now — your bag is safe though.");
    }
  };

  if (items.length === 0) {
    return (
      <div data-testid="cart-empty" className="max-w-xl mx-auto px-4 md:px-8 py-24 text-center space-y-5">
        <p className="font-accent text-4xl text-primary -rotate-2">{cartCfg.emptyTitle}</p>
        <p className="text-lg font-medium text-foreground/75">{cartCfg.emptySubtext}</p>
        <Link
          to="/#designs"
          data-testid="cart-empty-cta"
          className="tactile-btn bg-primary text-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4 inline-flex items-center gap-2"
        >
          {cartCfg.emptyCta} <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="cart-page" className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <p className="font-accent text-2xl text-primary -rotate-1">almost yours</p>
      <h1 className="font-headings text-4xl md:text-5xl font-bold tracking-tight mb-8">
        Your bag <span className="text-primary">({count})</span>
      </h1>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          {/* LINE ITEMS */}
          <div data-testid="cart-items-card" className="bg-white border-2 border-foreground rounded-2xl p-5 md:p-6 tactile-shadow space-y-5">
            {items.map((it, i) => (
              <div key={`${it.slug}-${it.model}`}>
                {i > 0 && <div className="border-t-2 border-dashed border-foreground/20 mb-5" />}
                <CartLineItem
                  item={it}
                  onQty={(q) => setQty(it.slug, it.model, q)}
                  onRemove={() => removeItem(it.slug, it.model)}
                />
              </div>
            ))}
          </div>

          {/* UPSELL GIFT */}
          {upsell.enabled && (
            <div
              data-testid="upsell-block"
              className="bg-secondary border-2 border-foreground rounded-2xl p-5 tactile-shadow-sm flex flex-wrap items-center gap-4"
            >
              <span className="bg-white border-2 border-foreground rounded-full p-3 rotate-3 shrink-0">
                <Gift size={22} />
              </span>
              <div className="flex-1 min-w-[220px]">
                <p className="font-accent text-2xl text-primary -rotate-1">{upsell.headline}</p>
                <p className="text-sm font-medium mt-1 leading-relaxed">{upsell.text}</p>
                {upsellClaimed && !upsellExpired && (
                  <p data-testid="upsell-claimed-label" className="mt-2 text-sm font-bold">
                    + {upsell.giftName} — FREE, added to your parcel
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  data-testid="upsell-countdown"
                  className="font-headings font-semibold text-sm tabular-nums bg-foreground text-white rounded-md px-2.5 py-1"
                >
                  {upsellLeft === null ? "--:--" : `${pad(Math.floor(upsellLeft / 60))}:${pad(upsellLeft % 60)}`}
                </span>
                <button
                  data-testid="upsell-claim-toggle"
                  disabled={upsellExpired}
                  onClick={toggleUpsell}
                  className={`border-2 border-foreground rounded-full px-4 py-1.5 text-sm font-bold tactile-shadow-sm transition-colors ${
                    upsellExpired
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : upsellClaimed
                        ? "bg-foreground text-white"
                        : "bg-primary text-white hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {upsellExpired ? "Offer expired" : upsellClaimed ? "Claimed" : "Claim free gift"}
                </button>
              </div>
            </div>
          )}

          {/* REVIEWS STRIP */}
          <div data-testid="cart-reviews-strip" className="bg-white border-2 border-foreground rounded-2xl p-5 tactile-shadow-sm">
            <p className="font-accent text-2xl text-primary -rotate-1 mb-4">squeezers say it best</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {content.reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="border-2 border-foreground rounded-xl p-3.5 bg-background">
                  <Stars rating={r.rating} size={12} />
                  <p className="text-xs font-medium mt-2 leading-relaxed line-clamp-3">“{r.text}”</p>
                  <p className="text-xs font-bold mt-2">— {r.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-2 lg:sticky lg:top-24">
          <div data-testid="cart-summary-card" className="bg-white border-2 border-foreground rounded-2xl p-5 md:p-6 tactile-shadow space-y-4">
            <FreeShippingBar subtotal={subtotal} threshold={cartCfg.freeShippingThreshold} currency={currency} />
            <CouponBanner coupon={coupon} mode="cart" applied={couponApplied} onApply={applyCoupon} />
            <DeliveryCountdown compact cutoffHour={delivery.cutoffHour} cutoffLabel={delivery.cutoffLabel} />

            <div className="border-t-2 border-dashed border-foreground/30 pt-3 space-y-1.5 text-sm font-semibold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span data-testid="cart-subtotal" className="tabular-nums">{currency}{subtotal.toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-primary">
                  <span>{coupon.code} (−{coupon.percent}%)</span>
                  <span data-testid="cart-discount" className="tabular-nums">−{currency}{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span data-testid="cart-shipping">{freeShip ? "Free" : "at checkout"}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1.5 border-t-2 border-foreground">
                <span className="font-headings text-lg font-bold">Total</span>
                <span data-testid="cart-total" className="font-headings text-2xl font-bold text-primary tabular-nums">
                  {currency}{total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              data-testid="cart-checkout-button"
              onClick={checkout}
              className="tactile-btn w-full bg-primary text-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              {cartCfg.checkoutLabel} <ArrowRight size={18} />
            </button>

            <div data-testid="cart-trust-row" className="flex flex-wrap justify-center gap-2 pt-1">
              {content.trustBadges.map((b) => {
                const Icon = TRUST_ICONS[b.icon] || ShieldCheck;
                return (
                  <span
                    key={b.text}
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"
                  >
                    <Icon size={12} /> {b.text}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
