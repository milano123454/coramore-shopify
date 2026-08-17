import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "squeezecase_cart";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [upsellClaimed, setUpsellClaimed] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, model, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((it) => it.slug === product.slug && it.model === model);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          model,
          price: product.price,
          currency: product.currency,
          image: product.images[0],
          qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((slug, model) => {
    setItems((prev) => prev.filter((it) => !(it.slug === slug && it.model === model)));
  }, []);

  const setQty = useCallback((slug, model, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => !(it.slug === slug && it.model === model))
        : prev.map((it) => (it.slug === slug && it.model === model ? { ...it, qty } : it))
    );
  }, []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  const value = {
    items,
    count,
    subtotal,
    addToCart,
    removeItem,
    setQty,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    couponApplied,
    applyCoupon: () => setCouponApplied(true),
    upsellClaimed,
    toggleUpsell: () => setUpsellClaimed((v) => !v),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
