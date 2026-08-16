import Hero3D from "@/components/home/Hero3D";
import Marquee from "@/components/Marquee";
import HowItFeels from "@/components/home/HowItFeels";
import BestSellers from "@/components/home/BestSellers";
import SocialProof from "@/components/home/SocialProof";
import VideoReviews from "@/components/VideoReviews";
import BrandStory from "@/components/home/BrandStory";
import Footer from "@/components/Footer";
import site from "@/config/site";

export default function HomePage() {
  return (
    <main data-testid="home-page">
      <Hero3D />
      <Marquee items={site.hero.marquee} />
      <HowItFeels />
      <BestSellers />
      <SocialProof />
      <VideoReviews data={site.videoReviews} />
      <BrandStory />
      <Footer />
    </main>
  );
}
