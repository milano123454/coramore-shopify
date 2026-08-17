import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { count, openDrawer } = useCart();

  return (
    <header data-testid="site-header" className="sticky top-0 z-50 bg-background border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" data-testid="brand-logo" className="font-headings text-2xl md:text-3xl font-bold tracking-tight flex items-center">
          Squeeze<span className="text-primary">Case</span>
          <span className="ml-1.5 w-3 h-3 rounded-full bg-accent border-2 border-foreground rotate-12 float-slow" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wide">
          <a href="/#story" data-testid="nav-story" className="hover:text-primary transition-colors">Her Story</a>
          <a href="/#designs" data-testid="nav-shop" className="hover:text-primary transition-colors">Shop</a>
          <a href="/product/the-brave-one#reviews" data-testid="nav-reviews" className="hover:text-primary transition-colors">Reviews</a>
        </nav>
        <button
          data-testid="cart-button"
          onClick={openDrawer}
          className="relative tactile-btn bg-white rounded-full p-2.5 md:p-3"
          aria-label="Cart"
        >
          <ShoppingBag size={20} strokeWidth={2.2} />
          <span
            data-testid="cart-count"
            className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-foreground"
          >
            {count}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
