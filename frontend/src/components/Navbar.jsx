import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import site from "@/config/site";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? "bg-cream/80 shadow-[0_1px_0_rgba(18,18,18,0.08)] backdrop-blur-xl" : "bg-transparent"}`} data-testid="navbar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" className="font-display text-2xl font-black tracking-tight" data-testid="nav-logo">
          Squeeze<span className="text-flame">Case</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigazione principale">
          {site.nav.links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-semibold text-smoke transition-colors duration-200 hover:text-ink" data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-flame" data-testid="nav-cart-button" aria-label={site.nav.cartLabel}>
            <ShoppingBag size={17} />
            <span className="hidden sm:inline">{site.nav.cartLabel}</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-flame px-1 text-[11px] font-black text-white" data-testid="nav-cart-count">
                {count}
              </span>
            )}
          </button>
          <button className="rounded-full p-2 md:hidden" onClick={() => setMenu(!menu)} aria-label={site.nav.menuLabel} data-testid="nav-menu-toggle">
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-ink/10 bg-cream/95 px-5 py-4 backdrop-blur-xl md:hidden" aria-label="Menu mobile">
          {site.nav.links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenu(false)} className="block py-3 font-display text-xl font-bold" data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
