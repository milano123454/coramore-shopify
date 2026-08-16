import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, useTexture, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import site from "@/config/site";
import MagneticButton from "@/components/MagneticButton";
import TrustpilotStars from "@/components/TrustpilotStars";

const TMP = new THREE.Vector3();

// The squishable silicone nose with elastic spring physics
function Nose({ position, color }) {
  const ref = useRef();
  const st = useRef({ s: new THREE.Vector3(1, 1, 1), v: new THREE.Vector3(), pressed: false, hint: false });

  // On-load hint: the nose presses itself three times
  useEffect(() => {
    const pulse = (t) => setTimeout(() => { st.current.hint = true; setTimeout(() => (st.current.hint = false), 480); }, t);
    const ids = [pulse(1800), pulse(3900), pulse(6000)];
    return () => ids.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const up = () => (st.current.pressed = false);
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const s = st.current;
    const down = s.pressed || s.hint;
    TMP.set(down ? 1.55 : 1, down ? 1.55 : 1, down ? 0.35 : 1);
    ["x", "y", "z"].forEach((axis) => {
      const f = (TMP[axis] - s.s[axis]) * 240 - s.v[axis] * 12;
      s.v[axis] += f * dt;
      s.s[axis] += s.v[axis] * dt;
    });
    ref.current.scale.copy(s.s);
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerDown={(e) => { e.stopPropagation(); st.current.pressed = true; }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => { document.body.style.cursor = "auto"; st.current.pressed = false; }}
      data-testid="hero-3d-nose"
    >
      <sphereGeometry args={[0.45, 48, 48]} />
      <meshStandardMaterial color={color} roughness={0.28} metalness={0.03} />
    </mesh>
  );
}

function CaseModel({ cfg }) {
  const tex = useTexture(cfg.textureUrl);
  tex.colorSpace = THREE.SRGBColorSpace;

  // Center-crop the print to cover the case back (like background-size: cover)
  useEffect(() => {
    const img = tex.image;
    if (!img) return;
    const planeAspect = 2.84 / 5.8;
    const imgAspect = img.width / img.height;
    if (imgAspect > planeAspect) {
      tex.repeat.set(planeAspect / imgAspect, 1);
      tex.offset.set((1 - planeAspect / imgAspect) / 2, 0);
    } else {
      tex.repeat.set(1, imgAspect / planeAspect);
      tex.offset.set(0, (1 - imgAspect / planeAspect) / 2);
    }
    tex.needsUpdate = true;
  }, [tex]);
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.45}>
      <group rotation={[0.05, -0.22, 0.04]}>
        <RoundedBox args={[3.2, 6.6, 0.5]} radius={0.26} smoothness={8}>
          <meshStandardMaterial color={cfg.caseColor} roughness={0.45} />
        </RoundedBox>
        <mesh position={[0, -0.14, 0.256]}>
          <planeGeometry args={[2.84, 5.8]} />
          <meshStandardMaterial map={tex} roughness={0.6} />
        </mesh>
        <RoundedBox args={[1.2, 1.2, 0.14]} radius={0.24} smoothness={6} position={[-0.8, 2.32, 0.27]}>
          <meshStandardMaterial color={cfg.caseColor} roughness={0.35} />
        </RoundedBox>
        <mesh position={[-1.05, 2.56, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
          <meshStandardMaterial color="#050505" roughness={0.15} metalness={0.4} />
        </mesh>
        <mesh position={[-0.58, 2.56, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
          <meshStandardMaterial color="#050505" roughness={0.15} metalness={0.4} />
        </mesh>
        <Nose position={[0, 0.15, 0.62]} color={cfg.noseColor} />
      </group>
    </Float>
  );
}

// Masked line-by-line title reveal
function HeroTitle({ lines }) {
  return (
    <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl" data-testid="hero-title">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-1">
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25 + i * 0.16, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {i === 0 ? line : <span className="text-flame">{line}</span>}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export const Hero3D = () => {
  const h = site.hero;
  const [interacted, setInteracted] = useState(false);

  return (
    <section className="relative overflow-hidden" data-testid="hero-section">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 pt-24 md:px-10 lg:min-h-screen lg:grid-cols-2 lg:gap-2 lg:pt-16">
        <div className="relative z-10 py-10 lg:py-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-flame"
            data-testid="hero-eyebrow"
          >
            {h.eyebrow}
          </motion.p>
          <div className="mt-5">
            <HeroTitle lines={h.titleLines} />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 max-w-md text-base leading-relaxed text-smoke md:text-lg"
            data-testid="hero-subtitle"
          >
            {h.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton testId="hero-cta-primary">
              <a href={h.ctaPrimary.href} className="flex h-14 items-center rounded-full bg-flame px-8 font-display text-base font-bold text-white shadow-[0_10px_30px_rgba(242,84,45,0.35)] transition-colors duration-200 hover:bg-flame-dark" data-testid="hero-cta-primary-link">
                {h.ctaPrimary.label}
              </a>
            </MagneticButton>
            <a href={h.ctaSecondary.href} className="flex h-14 items-center rounded-full border border-ink/15 px-8 text-sm font-bold transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white" data-testid="hero-cta-secondary">
              {h.ctaSecondary.label}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-8 flex items-center gap-3"
            data-testid="hero-rating-note"
          >
            <TrustpilotStars value={h.ratingNote.average} size={12} gap={2} />
            <p className="text-sm font-semibold text-smoke">
              <span className="font-black text-ink">{h.ratingNote.average}</span> · {h.ratingNote.count.toLocaleString("it-IT")} {h.ratingNote.text}
            </p>
          </motion.div>
        </div>

        <div className="relative h-[62vh] lg:h-[88vh]" onPointerDown={() => setInteracted(true)} data-testid="hero-3d-canvas">
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10.5], fov: 38 }}>
            <ambientLight intensity={0.95} />
            <directionalLight position={[4, 6, 6]} intensity={1.5} />
            <directionalLight position={[-5, -2, 4]} intensity={0.45} color="#ffd9c9" />
            <Suspense fallback={null}>
              <CaseModel cfg={h.model3d} />
            </Suspense>
            <ContactShadows position={[0, -4.4, 0]} opacity={0.32} scale={12} blur={2.8} far={6} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!interacted}
              autoRotateSpeed={1.1}
              minPolarAngle={Math.PI / 2.7}
              maxPolarAngle={Math.PI / 1.75}
              minAzimuthAngle={-1.05}
              maxAzimuthAngle={1.05}
            />
          </Canvas>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-ink/10 bg-white/80 px-5 py-2.5 text-xs font-bold backdrop-blur-lg"
            data-testid="hero-hint-pill"
          >
            <Hand size={14} className="nose-hint text-flame" />
            {h.hint}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
