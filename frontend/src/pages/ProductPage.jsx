import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import site from "@/config/site";
import Gallery from "@/components/product/Gallery";
import BuyBox from "@/components/product/BuyBox";
import HowItsMade from "@/components/product/HowItsMade";
import BenefitsStrip from "@/components/product/BenefitsStrip";
import LifestyleParallax from "@/components/product/LifestyleParallax";
import VideoReviews from "@/components/VideoReviews";
import ReviewsSection from "@/components/product/ReviewsSection";
import FAQ from "@/components/product/FAQ";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const { variantId } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const variant = useMemo(
    () => site.product.variants.find((v) => v.id === variantId) || site.product.variants[0],
    [variantId]
  );

  return (
    <main className="pt-20 md:pt-24" data-testid="product-page">
      <div className="container-sc grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16 lg:gap-y-0">
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <Gallery
            variant={variant}
            model={model}
            badge={site.product.galleryBadge}
            title={`${site.product.title} ${variant.name}`}
          />
        </div>
        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div data-testid="buy-box-sticky-wrapper">
            <BuyBox
              variant={variant}
              model={model}
              onModelChange={setModel}
              onVariantChange={(v) => navigate(`/prodotto/${v.id}`)}
            />
          </div>
        </div>
        <div className="min-w-0 space-y-12 pt-12 md:space-y-16 lg:col-start-1 lg:row-start-2 lg:pt-16">
          <HowItsMade variant={variant} />
          <BenefitsStrip />
          <LifestyleParallax />
        </div>
      </div>
      <VideoReviews data={site.videoReviews} />
      <ReviewsSection />
      <FAQ />
      <Footer />
    </main>
  );
}
