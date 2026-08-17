import { useState } from "react";
import { Search } from "lucide-react";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const ModelSelector = ({ groups, selected, onSelect }) => {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = groups
    .map((g) => ({
      ...g,
      models: q ? g.models.filter((m) => m.toLowerCase().includes(q)) : g.models,
    }))
    .filter((g) => g.models.length > 0);

  return (
    <div data-testid="model-selector" className="space-y-3">
      <p className="font-headings font-semibold uppercase text-sm tracking-wide">Find your phone</p>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          data-testid="model-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your model…"
          className="w-full bg-white border-2 border-foreground rounded-lg py-2.5 pl-9 pr-3 font-medium focus:outline-none focus:ring-4 focus:ring-accent"
        />
      </div>
      <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
        {visible.map((g) => (
          <div key={g.brand}>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{g.brand}</p>
            <div className="flex flex-wrap gap-2">
              {g.models.map((m) => {
                const active = selected === m;
                return (
                  <button
                    key={m}
                    data-testid={`model-option-${slugify(m)}`}
                    onClick={() => onSelect(m)}
                    className={`cursor-pointer border-2 border-foreground px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      active ? "bg-foreground text-white tactile-shadow-sm" : "bg-white hover:bg-accent"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p data-testid="model-no-results" className="text-sm text-muted-foreground font-medium">
            No match — try “iPhone 15” or “S24”. Don't see yours? DM Maya, she'll make it happen.
          </p>
        )}
      </div>
    </div>
  );
};

export default ModelSelector;
