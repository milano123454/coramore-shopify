import { createContext, useContext, useEffect, useMemo, useState } from "react";
import site from "@/config/site";

const CartContext = createContext(null);
const STORAGE_KEY = "sc-cart-v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });
  const [coupon, setCoupon] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);

  const addItem = (item) => {
    setItems((prev) => {
      const key = (i) => `${i.variantId}|${i.model}`;
      const found = prev.find((i) => key(i) === key(item));
      if (found) return prev.map((i) => (key(i) === key(item) ? { ...i, qty: i.qty + item.qty } : i));
      return [...prev, { ...item, id: `${Date.now()}` }];
    });
    setOpen(true);
  };

  const updateQty = (id, qty) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))));

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const applyCoupon = (code) => {
    const c = site.product.coupon;
    if (code.trim().toUpperCase() === c.code) { setCoupon({ code: c.code, percent: c.percent }); return true; }
    return false;
  };
  const removeCoupon = () => setCoupon(null);

  const { subtotal, discount, total, count } = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = coupon ? (subtotal * coupon.percent) / 100 : 0;
    return { subtotal, discount, total: subtotal - discount, count: items.reduce((s, i) => s + i.qty, 0) };
  }, [items, coupon]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, coupon, applyCoupon, removeCoupon, subtotal, discount, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

export const formatPrice = (n) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: site.product.price.currency }).format(n);
