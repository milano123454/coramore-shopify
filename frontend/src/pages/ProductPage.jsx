import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, ShoppingBag, Zap } from "lucide-react";
import { toast } from "sonner";
import { getContent } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import Stars from "@/components/Stars";
import CouponBanner from "@/components/CouponBanner";
import ModelSelector from "@/components/ModelSelector";
import DeliveryCountdown from "@/components/DeliveryCountdown";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";

const TRUST_ICONS = { truck: Truck, shield: ShieldCheck, refresh: RotateCcw };

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, openDrawer } = useCart();
  const [content, setContent] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    getContent().then(setContent).catch(console.error);
    setActiveImage(0);
  }, [slug]);

  if (!content) {
    return (
      <div data-testid="product-loading" className="min-h-[60vh] flex items-center justify-center font-headings text-2xl font-semibold">
        squeezing…
      </div>
    );
  }

  const product = content.products.find((p) => p.slug === slug) || content.products[0];
  const off = Math.round((1 - product.price / product.compareAt) * 100);

  const handleAddToCart = () => {
    if (!selectedModel) {
      toast.error("Pick your phone model first — top of the page!");
      return;
    }
    addToCart(product, selectedModel);
    openDrawer();
  };

  const handleBuyNow = () => {
    if (!selectedModel) {
      toast.error("Pick your phone model first — top of the page!");
      return;
    }
    addToCart(product, selectedModel);
    navigate("/cart");
  };

  return (
    <div data-testid="product-page">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 grid lg:grid-cols-2 gap-12">
        {/* GALLERY */}
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative border-2 border-foreground rounded-2xl overflow-hidden tactile-shadow bg-white">
            <img
              data-testid="product-main-image"
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-[380px] md:h-[520px] object-cover"
            />
            <span
              data-testid="product-review-badge"
              className="absolute top-4 left-4 bg-white border-2 border-foreground rounded-full px-3 py-1.5 tactile-shadow-sm -rotate-2 inline-flex items-center gap-1.5"
            >
              <Stars rating={product.rating} size={11} />
              <span className="text-xs font-bold whitespace-nowrap">{product.rating} · {product.reviewCount.toLocaleString()} reviews</span>
            </span>
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                data-testid={`product-thumbnail-${i}`}
                onClick={() => setActiveImage(i)}
                className={`border-2 border-foreground rounded-xl overflow-hidden w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-105 hover:-rotate-1 ${
                  activeImage === i ? "tactile-shadow-sm ring-4 ring-accent" : "opacity-70"
                }`}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* INFO */}
        <motion.div
          className="lg:sticky lg:top-24 self-start space-y-5"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Stars rating={product.rating} size={18} />
              <a href="#reviews" data-testid="product-review-count" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                ({product.reviewCount} reviews)
              </a>
            </div>
            <h1 data-testid="product-title" className="font-headings text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-base md:text-lg text-foreground/80 font-medium">{product.tagline}</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span data-testid="product-price" className="font-headings text-4xl font-bold text-primary">
              {product.currency}{product.price.toFixed(2)}
            </span>
            <span data-testid="product-compare-price" className="text-xl text-muted-foreground line-through font-semibold">
              {product.currency}{product.compareAt.toFixed(2)}
            </span>
            <span data-testid="product-discount-pill" className="bg-primary text-white text-sm font-bold px-2.5 py-1 rounded-md border-2 border-foreground rotate-3 inline-block">
              {off}% OFF
            </span>
          </div>

          <p data-testid="klarna-note" className="text-sm font-semibold flex items-center gap-2 flex-wrap">
            {product.klarnaNote}
            <span className="bg-[#FFB3C7] border-2 border-foreground rounded-full px-3 py-0.5 font-headings font-semibold italic text-foreground">Klarna.</span>
          </p>

          <CouponBanner coupon={content.coupon} />

          <div className="border-2 border-foreground rounded-xl bg-white p-4 tactile-shadow-sm">
            <ModelSelector groups={content.models} selected={selectedModel} onSelect={setSelectedModel} />
            {selectedModel && (
              <p data-testid="model-selected-label" className="mt-3 text-sm font-semibold">
                Fit locked in: <span className="text-primary">{selectedModel}</span>
              </p>
            )}
          </div>

          <DeliveryCountdown cutoffHour={content.delivery.cutoffHour} cutoffLabel={content.delivery.cutoffLabel} />

          <div className="space-y-3 pt-1">
            <button
              data-testid="add-to-cart-button"
              onClick={handleAddToCart}
              className="tactile-btn w-full bg-primary text-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
            <button
              data-testid="buy-now-button"
              onClick={handleBuyNow}
              className="tactile-btn w-full bg-white font-headings uppercase text-lg tracking-wide rounded-full px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              <Zap size={20} /> Buy Now
            </button>
          </div>

          <div data-testid="trust-badge-row" className="flex flex-wrap gap-2 pt-1">
            {content.trustBadges.map((b) => {
              const Icon = TRUST_ICONS[b.icon] || ShieldCheck;
              return (
                <span
                  key={b.text}
                  className="inline-flex items-center gap-1.5 border-2 border-foreground rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide bg-background"
                >
                  <Icon size={14} /> {b.text}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Reviews reviews={content.reviews} />
      <FAQ items={content.faq} />
    </div>
  );
};

export default ProductPage;
