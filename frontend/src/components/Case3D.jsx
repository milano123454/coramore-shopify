import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import site from "@/config/site";

// Code-split the three.js scene so it loads after first paint
const Case3DScene = lazy(() => import("@/components/Case3DScene"));

export function getPhoneSpec(modelName, models, phone3d) {
  const brand = modelName
    ? models.brands.find((b) => b.families.some((f) => f.models.includes(modelName)))
    : null;
  const camera = phone3d.cameras[brand?.id] || "square";
  const lower = (modelName || "").toLowerCase();
  const size = phone3d.sizes.find((s) => s.keywords.some((k) => lower.includes(k)));
  return { camera, w: size?.w ?? 1, h: size?.h ?? 1 };
}

// Wrapper: lazy mount, pause off-screen (IntersectionObserver), static fallback
// on low-end devices or prefers-reduced-motion. Hint shows ONLY when the live
// 3D scene has mounted and is interactive.
export default function Case3D({ textureUrl, caseColor, nose, modelName = null, autoRotate = true, placeholder, alt = "", className = "", cameraZ = 10.5, hint }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  const fallback = useMemo(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = (navigator.hardwareConcurrency || 8) <= 2 || (navigator.deviceMemory || 8) <= 1;
    return reduced || lowEnd;
  }, []);

  useEffect(() => {
    if (fallback) return;
    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(id);
  }, [fallback]);

  useEffect(() => {
    if (fallback || !ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [fallback]);

  const spec = useMemo(
    () => getPhoneSpec(modelName, site.product.models, site.product.phone3d),
    [modelName]
  );

  return (
    <div ref={ref} className={`relative h-full w-full ${className}`} data-testid="case-3d">
      {(fallback || !ready || !sceneReady) && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
          <img
            src={placeholder}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`max-h-full w-auto max-w-[74%] rounded-[2rem] object-cover shadow-xl ${fallback ? "case-float" : "opacity-70"}`}
            style={{ aspectRatio: "3 / 5.5" }}
            data-testid="case-3d-fallback"
          />
        </div>
      )}
      {!fallback && ready && (
        <Suspense fallback={null}>
          <Case3DScene
            textureUrl={textureUrl}
            caseColor={caseColor}
            nose={nose}
            dims={{ w: spec.w, h: spec.h }}
            cameraType={spec.camera}
            autoRotate={autoRotate}
            frameloop={visible ? "always" : "never"}
            cameraZ={cameraZ}
            onReady={() => setSceneReady(true)}
          />
        </Suspense>
      )}
      {hint && !fallback && sceneReady && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pointer-events-none absolute bottom-5 left-1/2 flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-ink/10 bg-white/85 px-5 py-2.5 text-sm font-bold backdrop-blur-lg"
          data-testid="case-3d-hint"
        >
          <Hand size={14} className="nose-hint shrink-0 text-flame" />
          <span className="truncate">{hint}</span>
        </motion.div>
      )}
    </div>
  );
}
