import { Star } from "lucide-react";

// Image swatches with per-variant rating above each image + sold-out state
export const VariantSelector = ({ variants, selected, onSelect, label }) => (
  <div data-testid="variant-selector">
    <p className="mb-3 text-sm font-bold">
      {label} — <span className="text-smoke" data-testid="variant-selected-name">{selected.name} · {selected.colorName}</span>
    </p>
    <div className="grid grid-cols-4 gap-3 pt-2">
      {variants.map((v) => {
        const isActive = selected.id === v.id;
        return (
          <button
            key={v.id}
            onClick={() => v.inStock && onSelect(v)}
            disabled={!v.inStock}
            aria-label={`${v.name}${v.inStock ? "" : " — esaurito"}`}
            className={`relative rounded-2xl border-2 p-1 transition-[border-color,transform] duration-200 ${isActive ? "border-flame" : "border-transparent hover:border-ink/25"} ${!v.inStock ? "cursor-not-allowed" : "active:scale-95"}`}
            data-testid={`variant-swatch-${v.id}`}
          >
            <span className="absolute -top-2 right-0 z-10 flex items-center gap-1 rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-black text-white" data-testid={`variant-rating-${v.id}`}>
              <Star size={9} fill="#00B67A" strokeWidth={0} /> {v.rating}
            </span>
            <span className="relative block overflow-hidden rounded-xl">
              <img
                src={v.image}
                alt={`Variante ${v.name}`}
                loading="lazy"
                className={`aspect-square w-full object-cover ${!v.inStock ? "opacity-40 grayscale" : ""}`}
              />
              {!v.inStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="rotate-[-12deg] rounded bg-ink/80 px-2 py-0.5 text-[9px] font-black uppercase text-white" data-testid={`variant-soldout-${v.id}`}>
                    Esaurito
                  </span>
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default VariantSelector;
