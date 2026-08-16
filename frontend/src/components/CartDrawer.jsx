import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import site from "@/config/site";
import { useCart, formatPrice } from "@/context/CartContext";

export const CartDrawer = () => {
  const { items, updateQty, removeItem, subtotal, discount, total, coupon, open, setOpen } = useCart();
  const c = site.cart;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col bg-cream sm:max-w-md" data-testid="cart-drawer">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-black tracking-tight" data-testid="cart-title">{c.title}</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag size={44} className="text-ink/20" />
            <p className="font-display text-xl font-bold" data-testid="cart-empty-title">{c.emptyTitle}</p>
            <p className="text-sm text-smoke">{c.emptyText}</p>
            <a href="/prodotto/panda-rosso" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-flame" data-testid="cart-empty-cta">
              {c.emptyCta}
            </a>
          </div>
        ) : (
          <>
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-3" data-testid={`cart-item-${i.id}`}>
                  <img src={i.image} alt={i.variantName} className="h-20 w-16 rounded-xl object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold">{site.product.title} · {i.variantName}</p>
                        <p className="text-xs text-smoke">{i.model}</p>
                      </div>
                      <button onClick={() => removeItem(i.id)} aria-label={c.remove} className="text-ink/30 transition-colors hover:text-destructive" data-testid={`cart-remove-${i.id}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 rounded-full border border-ink/10 px-2 py-1">
                        <button onClick={() => updateQty(i.id, i.qty - 1)} aria-label="Diminuisci quantità" data-testid={`cart-qty-minus-${i.id}`}><Minus size={14} /></button>
                        <span className="w-4 text-center text-sm font-bold" data-testid={`cart-qty-${i.id}`}>{i.qty}</span>
                        <button onClick={() => updateQty(i.id, i.qty + 1)} aria-label="Aumenta quantità" data-testid={`cart-qty-plus-${i.id}`}><Plus size={14} /></button>
                      </div>
                      <p className="text-sm font-black">{formatPrice(i.price * i.qty)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm">
              <div className="flex justify-between"><span className="text-smoke">{c.subtotal}</span><span className="font-bold" data-testid="cart-subtotal">{formatPrice(subtotal)}</span></div>
              {coupon && (
                <div className="flex justify-between text-trustpilot"><span>{c.discount} ({coupon.code})</span><span className="font-bold" data-testid="cart-discount">−{formatPrice(discount)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-smoke">{c.shipping}</span><span className="font-bold text-trustpilot">{c.shippingFree}</span></div>
              <div className="flex justify-between pt-2 font-display text-xl font-black"><span>{c.total}</span><span data-testid="cart-total">{formatPrice(total)}</span></div>
              <button
                onClick={() => toast.info(site.product.buyBox.checkoutToast)}
                className="mt-3 w-full rounded-full bg-flame py-4 font-display text-base font-bold text-white transition-colors duration-200 hover:bg-flame-dark"
                data-testid="cart-checkout-button"
              >
                {c.checkout}
              </button>
              <p className="text-center text-xs text-smoke">{c.checkoutNote}</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
