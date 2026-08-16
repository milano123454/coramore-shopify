import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import HomePage from "@/pages/HomePage";
import ProductPage from "@/pages/ProductPage";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        if (window.__lenis) window.__lenis.scrollTo(hash, { offset: -80 });
        else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollManager />
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prodotto/:variantId" element={<ProductPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
