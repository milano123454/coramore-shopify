import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import site from "@/config/site";
import Gallery from "@/components/product/Gallery";
import BuyBox from "@/components/product/BuyBox";
import ReviewsSection from "@/components/product/ReviewsSection";
import FAQ from "@/components/product/FAQ";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const { variantId } = useParams();
  const navigate = useNavigate();
  const variant = useMemo(
    () => site.product.variants.find((v) => v.id === variantId) || site.product.variants[0],
    [variantId]
  );

  return (
    <main className="pt-20 md:pt-24" data-testid="product-page">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Gallery
          images={variant.gallery}
          badge={site.product.galleryBadge}
          title={`${site.product.title} ${variant.name}`}
        />
        <BuyBox variant={variant} onVariantChange={(v) => navigate(`/prodotto/${v.id}`)} />
      </div>
      <ReviewsSection />
      <FAQ />
      <Footer />
    </main>
  );
}
