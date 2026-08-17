import { Minus, Plus, X } from "lucide-react";

const CartLineItem = ({ item, onQty, onRemove, dense = false }) => {
  const imgSize = dense ? "w-14 h-14" : "w-20 h-20";
  return (
    <div data-testid={`cart-item-${item.slug}`} className="flex gap-3 items-start">
      <img
        src={item.image}
        alt={item.name}
        className={`${imgSize} rounded-lg border-2 border-foreground object-cover shrink-0`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-headings font-semibold text-sm md:text-base leading-tight truncate">{item.name}</p>
            <p className="text-xs font-semibold text-muted-foreground mt-0.5 truncate">{item.model}</p>
          </div>
          <button
            data-testid={`remove-item-${item.slug}`}
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
            className="border-2 border-foreground rounded-full p-1 bg-white hover:bg-primary hover:text-white transition-colors shrink-0"
          >
            <X size={13} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="inline-flex items-center border-2 border-foreground rounded-full bg-white">
            <button
              data-testid={`qty-minus-${item.slug}`}
              onClick={() => onQty(item.qty - 1)}
              className="px-2 py-1 hover:text-primary transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span data-testid={`qty-value-${item.slug}`} className="text-xs font-bold w-5 text-center tabular-nums">
              {item.qty}
            </span>
            <button
              data-testid={`qty-plus-${item.slug}`}
              onClick={() => onQty(item.qty + 1)}
              className="px-2 py-1 hover:text-primary transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="text-sm font-bold tabular-nums">
            {item.currency}{(item.price * item.qty).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartLineItem;
