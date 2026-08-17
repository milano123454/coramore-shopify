import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { getContent } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import CartLineItem from "@/components/CartLineItem";
import FreeShippingBar from "@/components/FreeShippingBar";
import CouponBanner from "@/components/CouponBanner";
import DeliveryCountdown from "@/components/DeliveryCountdown";

const CartDrawer = () => {
  const {
    items, count, subtotal, setQty, removeItem,
    drawerOpen, closeDrawer, couponApplied, applyCoupon,
  } = useCart();
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (drawerOpen && !content) getContent().then(setContent).catch(console.error);
  }, [drawerOpen, content]);

  const discount = couponApplied && content ? subtotal * (content.coupon.percent / 100) : 0;
  const currency = items[0]?.currency || "$";

  const checkout = () => {
    if (content?.cart?.checkoutUrl) {
      window.location.href = content.cart.checkoutUrl;
    } else {
      toast.info("Checkout is a demo for now — your bag is safe though.");
    }
  };

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            data-testid="cart-overlay"
            onClick={closeDrawer}
            className="fixed inset-0 bg-foreground/40 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            data-testid="cart-drawer"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l-2 border-foreground z-[70] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-foreground">
              <p className="font-headings text-2xl font-bold">
                your bag{" "}
                <span
                  data-testid="drawer-cart-count"
                  className="ml-1 text-sm bg-primary text-white border-2 border-foreground rounded-full px-2.5 py-0.5 align-middle"
                >
                  {count}
                </span>
              </p>
              <button
                data-testid="close-cart-drawer"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="tactile-btn bg-white rounded-full p-2"
              >
                <X size={16} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="font-accent text-3xl text-primary -rotate-2">
                  {content?.cart?.emptyTitle || "your bag is feeling light"}
                </p>
                <p className="font-medium text-foreground/70">{content?.cart?.emptySubtext}</p>
                <Link
                  to="/#designs"
                  onClick={closeDrawer}
                  data-testid="drawer-empty-cta"
                  className="tactile-btn bg-primary text-white font-headings uppercase text-sm tracking-wide rounded-full px-6 py-3"
                >
                  {content?.cart?.emptyCta || "Choose your design"}
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                  <div className="space-y-4">
                    {items.map((it) => (
                      <CartLineItem
                        key={`${it.slug}-${it.model}`}
                        item={it}
                        dense
                        onQty={(q) => setQty(it.slug, it.model, q)}
                        onRemove={() => removeItem(it.slug, it.model)}
                      />
                    ))}
                  </div>
                  {content && (
                    <>
                      <FreeShippingBar
                        subtotal={subtotal}
                        threshold={content.cart.freeShippingThreshold}
                        currency={currency}
                      />
                      <CouponBanner coupon={content.coupon} mode="cart" applied={couponApplied} onApply={applyCoupon} />
                      <DeliveryCountdown
                        compact
                        cutoffHour={content.delivery.cutoffHour}
                        cutoffLabel={content.delivery.cutoffLabel}
                      />
                    </>
                  )}
                </div>
                <div className="border-t-2 border-foreground px-5 py-4 space-y-3 bg-white">
                  <div className="space-y-1 text-sm font-semibold">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span data-testid="drawer-subtotal" className="tabular-nums">{currency}{subtotal.toFixed(2)}</span>
                    </div>
                    {couponApplied && content && (
                      <div className="flex justify-between text-primary">
                        <span>{content.coupon.code} (−{content.coupon.percent}%)</span>
                        <span data-testid="drawer-discount" className="tabular-nums">−{currency}{discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <button
                    data-testid="drawer-checkout-button"
                    onClick={checkout}
                    className="tactile-btn w-full bg-primary text-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-3.5 inline-flex items-center justify-center gap-2"
                  >
                    {content?.cart?.checkoutLabel || "Proceed to Checkout"} <ArrowRight size={18} />
                  </button>
                  <button
                    data-testid="drawer-continue-shopping"
                    onClick={closeDrawer}
                    className="w-full text-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                  >
                    or keep browsing
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
