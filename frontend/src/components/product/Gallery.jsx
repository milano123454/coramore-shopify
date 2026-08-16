import { useState } from "react";
import TrustpilotStars from "@/components/TrustpilotStars";

// Sticky gallery: main image with hover zoom, thumbnails, floating review badge
export const Gallery = ({ images, badge, title }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24" data-testid="product-gallery">
      <div className="group relative overflow-hidden rounded-[2rem] border border-ink/5 bg-white">
        <img
          key={active}
          src={images[active]}
          alt={`${title} — immagine ${active + 1}`}
          className="zoom-img aspect-[4/5] w-full object-cover group-hover:scale-110"
          data-testid="gallery-main-image"
        />
        <div
          className="absolute left-4 top-4 flex items-center gap-2.5 rounded-full bg-ink/85 py-2 pl-3 pr-4 backdrop-blur-md"
          data-testid="gallery-review-badge"
        >
          <TrustpilotStars value={badge.average} size={10} gap={2} />
          <span className="text-xs font-bold text-white">
            {badge.average} · {badge.count.toLocaleString("it-IT")} recensioni
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-3" role="tablist" aria-label="Miniature galleria">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="tab"
            aria-selected={active === i}
            className={`overflow-hidden rounded-2xl border-2 transition-[border-color,opacity] duration-200 ${active === i ? "border-flame" : "border-transparent opacity-60 hover:opacity-100"}`}
            data-testid={`gallery-thumb-${i}`}
          >
            <img src={img} alt={`${title} — miniatura ${i + 1}`} loading="lazy" className="h-20 w-16 object-cover sm:h-24 sm:w-20" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
