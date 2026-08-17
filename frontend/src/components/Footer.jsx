import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer data-testid="site-footer" className="border-t-2 border-foreground bg-white mt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5 space-y-4">
          <p className="font-headings text-2xl font-bold">
            Squeeze<span className="text-primary">Case</span>
          </p>
          <p className="text-muted-foreground max-w-sm">
            Phone cases designed by a girl who got told to stop filming — and didn't.
          </p>
          <p className="font-accent text-2xl text-primary -rotate-2 inline-flex items-center gap-2">
            packed with love & a pep talk <Heart size={18} className="fill-primary text-primary" />
          </p>
        </div>
        <div className="md:col-span-2 space-y-3">
          <p className="font-headings font-semibold uppercase text-sm tracking-wide">Shop</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/product/the-brave-one" data-testid="footer-shop-brave-one" className="hover:text-primary transition-colors">The Brave One</Link></li>
            <li><span data-testid="footer-shop-gift-cards" className="hover:text-primary transition-colors cursor-pointer">Gift Cards</span></li>
            <li><span data-testid="footer-shop-student" className="hover:text-primary transition-colors cursor-pointer">Student Discount</span></li>
          </ul>
        </div>
        <div className="md:col-span-2 space-y-3">
          <p className="font-headings font-semibold uppercase text-sm tracking-wide">Help</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/product/the-brave-one#faq" data-testid="footer-help-faq" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><span data-testid="footer-help-shipping" className="hover:text-primary transition-colors cursor-pointer">Shipping & Returns</span></li>
            <li><span data-testid="footer-help-contact" className="hover:text-primary transition-colors cursor-pointer">Contact Maya</span></li>
          </ul>
        </div>
        <div className="md:col-span-3 space-y-3">
          <p className="font-headings font-semibold uppercase text-sm tracking-wide">Follow along</p>
          <div className="flex flex-wrap gap-2">
            {["YouTube", "TikTok", "Instagram"].map((s) => (
              <span
                key={s}
                data-testid={`footer-social-${s.toLowerCase()}`}
                className="cursor-pointer border-2 border-foreground rounded-full px-4 py-1.5 text-sm font-semibold bg-background hover:bg-accent transition-colors tactile-shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-foreground">
        <p className="max-w-7xl mx-auto px-4 md:px-8 py-4 text-sm text-muted-foreground">
          © 2026 SqueezeCase. Made by Maya, for the brave ones.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
