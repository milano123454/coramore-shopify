import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((product, model) => {
    setItems((prev) => [...prev, { slug: product.slug, name: product.name, model }]);
  }, []);

  return (
    <CartContext.Provider value={{ items, count: items.length, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
