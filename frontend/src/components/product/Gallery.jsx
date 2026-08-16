import { useRef, useState } from "react";
import { Pause, Play, Rotate3d } from "lucide-react";
import site from "@/config/site";
import TrustpilotStars from "@/components/TrustpilotStars";
import Case3D from "@/components/Case3D";

// Gallery: live 3D case (linked to model + variant), product video, zoomable images
export const Gallery = ({ variant, model, badge, title }) => {
  const p = site.product;
  const items = [
    { type: "3d" },
    ...(p.galleryVideo?.src ? [{ type: "video" }] : []),
    ...variant.gallery.map((src) => ({ type: "image", src })),
  ];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);
  const item = items[active] || items[0];

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div data-testid="product-gallery">
      <div className="relative overflow-hidden rounded-[2rem] border border-ink/5 bg-white">
        <div className="aspect-[4/5] w-full">
          {item.type === "3d" && (
            <div className="relative h-full w-full bg-gradient-to-b from-sand/70 via-cream to-white">
              <Case3D
                textureUrl={variant.image}
                caseColor={variant.caseColor || site.hero.model3d.caseColor}
                nose={variant.nose}
                modelName={model}
                cameraZ={12.5}
                placeholder={variant.image}
                alt={`${title} in 3D`}
                hint={p.gallery3d.hint}
              />
            </div>
          )}
          {item.type === "video" && (
            <div className="relative h-full w-full bg-ink">
              {videoFailed ? (
                <img src={p.galleryVideo.poster} alt="Anteprima video" className="h-full w-full object-cover opacity-80" data-testid="gallery-video-fallback" />
              ) : (
                <video
                  ref={videoRef}
                  src={p.galleryVideo.src}
                  poster={p.galleryVideo.poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onError={() => setVideoFailed(true)}
                  className="h-full w-full object-cover"
                  data-testid="gallery-video"
                />
              )}
              {!videoFailed && (
                <button
                  onClick={toggleVideo}
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-transform duration-200 hover:scale-105"
                  aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}
                  data-testid="gallery-video-toggle"
                >
                  {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
              )}
            </div>
          )}
          {item.type === "image" && (
            <div className="group h-full w-full overflow-hidden">
              <img
                key={item.src}
                src={item.src}
                alt={`${title} — immagine ${active + 1}`}
                decoding="async"
                className="zoom-img h-full w-full object-cover group-hover:scale-110"
                data-testid="gallery-main-image"
              />
            </div>
          )}
        </div>
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

      <div className="mt-4 flex flex-wrap gap-2.5 md:gap-3" role="tablist" aria-label="Miniature galleria">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="tab"
            aria-selected={active === i}
            className={`relative overflow-hidden rounded-2xl border-2 transition-[border-color,opacity] duration-200 ${active === i ? "border-flame" : "border-transparent opacity-60 hover:opacity-100"}`}
            data-testid={`gallery-thumb-${i}`}
          >
            {it.type === "3d" ? (
              <span className="relative block">
                <img src={variant.image} alt={`${title} — anteprima 3D`} loading="lazy" className="h-20 w-16 object-cover sm:h-24 sm:w-20" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-ink/45 text-white">
                  <Rotate3d size={18} />
                  <span className="text-[11px] font-black uppercase">{p.gallery3d.thumbLabel}</span>
                </span>
              </span>
            ) : it.type === "video" ? (
              <span className="relative block">
                <img src={p.galleryVideo.poster} alt={`${title} — anteprima video`} loading="lazy" className="h-20 w-16 object-cover sm:h-24 sm:w-20" />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/45 text-white">
                  <Play size={18} fill="#fff" />
                </span>
              </span>
            ) : (
              <img src={it.src} alt={`${title} — miniatura ${i + 1}`} loading="lazy" className="h-20 w-16 object-cover sm:h-24 sm:w-20" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
