import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Check, ChevronRight, Flame, History } from "lucide-react";

const RECENT_KEY = "sc-recent-models";

// Searchable brand -> family -> model picker with popular & recent pins
export const ModelSelector = ({ config, selected, onSelect }) => {
  const [query, setQuery] = useState("");
  const [brandId, setBrandId] = useState(config.brands[0].id);
  const [familyName, setFamilyName] = useState(config.brands[0].families[0].name);
  const [editing, setEditing] = useState(!selected);
  const [recents, setRecents] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
  });

  const allModels = useMemo(
    () => config.brands.flatMap((b) => b.families.flatMap((f) => f.models)),
    [config]
  );
  const results = query.trim()
    ? allModels.filter((m) => m.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 12)
    : null;

  const brand = config.brands.find((b) => b.id === brandId);
  const family = brand.families.find((f) => f.name === familyName) || brand.families[0];

  const pick = (m) => {
    onSelect(m);
    const r = [m, ...recents.filter((x) => x !== m)].slice(0, 4);
    setRecents(r);
    localStorage.setItem(RECENT_KEY, JSON.stringify(r));
    setEditing(false);
    setQuery("");
  };

  const pickBrand = (id) => {
    setBrandId(id);
    const b = config.brands.find((x) => x.id === id);
    setFamilyName(b.families[0].name);
  };

  // Persistent summary chip once a model is chosen
  if (selected && !editing) {
    return (
      <div data-testid="model-selector">
        <p className="mb-3 text-sm font-bold">{config.label}</p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-2xl border border-trustpilot/40 bg-trustpilot/10 px-5 py-4"
          data-testid="model-summary-chip"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-trustpilot text-white"><Check size={16} strokeWidth={3} /></span>
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-trustpilot">{config.confirmLabel}</span>
              <span className="font-display text-lg font-bold" data-testid="model-summary-name">{selected}</span>
            </span>
          </span>
          <button onClick={() => setEditing(true)} className="text-sm font-bold text-smoke underline-offset-4 transition-colors hover:text-flame hover:underline" data-testid="model-change-button">
            {config.changeLabel}
          </button>
        </motion.div>
      </div>
    );
  }

  const ModelButton = ({ m, testId }) => (
    <button
      onClick={() => pick(m)}
      className="rounded-xl border border-ink/10 bg-white px-3 py-3.5 text-left text-sm font-semibold transition-[border-color,background-color] duration-150 hover:border-flame hover:bg-flame/5 active:scale-[0.98]"
      data-testid={testId}
    >
      {m}
    </button>
  );

  return (
    <div data-testid="model-selector">
      <p className="mb-3 text-sm font-bold">{config.label}</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${brandId}-${familyName}-${results ? "search" : "browse"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="space-y-4 rounded-2xl border border-ink/10 bg-white p-4"
        >
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={config.searchPlaceholder}
              className="h-12 w-full rounded-xl border border-ink/10 bg-cream pl-11 pr-4 text-sm font-semibold placeholder:text-ink/35 focus:border-flame"
              data-testid="model-search-input"
              aria-label={config.searchPlaceholder}
            />
          </div>

          {results ? (
            results.length ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" data-testid="model-search-results">
                {results.map((m) => <ModelButton key={m} m={m} testId={`model-option-${m.toLowerCase().replace(/[\s()+]/g, "-")}`} />)}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-smoke" data-testid="model-empty-result">{config.emptyResult}</p>
            )
          ) : (
            <>
              {recents.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-smoke"><History size={12} /> {config.recentLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {recents.map((m) => (
                      <button key={m} onClick={() => pick(m)} className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-bold transition-colors hover:border-flame hover:text-flame" data-testid={`model-recent-${m.toLowerCase().replace(/[\s()+]/g, "-")}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-smoke"><Flame size={12} className="text-flame" /> {config.popularLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {config.popular.map((m) => (
                    <button key={m} onClick={() => pick(m)} className="rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-flame" data-testid={`model-popular-${m.toLowerCase().replace(/[\s()+]/g, "-")}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-smoke">{config.brandsLabel}</p>
                <div className="flex flex-wrap gap-2" role="tablist" aria-label={config.brandsLabel}>
                  {config.brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => pickBrand(b.id)}
                      role="tab"
                      aria-selected={brandId === b.id}
                      className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors duration-150 ${brandId === b.id ? "bg-flame text-white" : "border border-ink/15 hover:border-ink"}`}
                      data-testid={`model-brand-${b.id}`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
                {brand.families.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setFamilyName(f.name)}
                    className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors duration-150 ${family.name === f.name ? "bg-ink text-white" : "bg-cream text-smoke hover:text-ink"}`}
                    data-testid={`model-family-${f.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {f.name} {family.name === f.name && <ChevronRight size={12} />}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3" data-testid="model-grid">
                {family.models.map((m) => <ModelButton key={m} m={m} testId={`model-option-${m.toLowerCase().replace(/[\s()+]/g, "-")}`} />)}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ModelSelector;
