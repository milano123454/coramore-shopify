import { Truck } from "lucide-react";

const FreeShippingBar = ({ subtotal, threshold, currency = "$" }) => {
  const remaining = Math.max(0, threshold - subtotal);
  const qualified = subtotal >= threshold;
  const width = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (qualified) {
    return (
      <div data-testid="free-shipping-bar">
        <p
          data-testid="free-shipping-message"
          className="text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5 bg-secondary border-2 border-foreground rounded-full px-3 py-1.5 tactile-shadow-sm -rotate-1"
        >
          <Truck size={14} /> You qualify for free shipping
        </p>
      </div>
    );
  }

  return (
    <div data-testid="free-shipping-bar" className="space-y-1.5">
      <p data-testid="free-shipping-message" className="text-sm font-semibold">
        Add <span className="text-primary font-bold">{currency}{remaining.toFixed(2)}</span> more for free shipping
      </p>
      <div className="h-3 border-2 border-foreground rounded-full bg-white overflow-hidden">
        <div
          data-testid="free-shipping-progress"
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default FreeShippingBar;
