import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const PLANE_W = 2.84;
const PLANE_H = 5.8;
const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;

// Shared guard: when the nose is being pressed, the canvas drag rig ignores it
let noseHeldUntil = 0;

function coverCrop(tex, planeAspect) {
  const img = tex.image;
  if (!img) return;
  const imgAspect = img.width / img.height;
  if (imgAspect > planeAspect) {
    tex.repeat.set(planeAspect / imgAspect, 1);
    tex.offset.set((1 - planeAspect / imgAspect) / 2, 0);
  } else {
    tex.repeat.set(1, imgAspect / planeAspect);
    tex.offset.set(0, (1 - imgAspect / planeAspect) / 2);
  }
  tex.needsUpdate = true;
}

// Printed back with smooth crossfade when the design variant changes
function PrintPlane({ url }) {
  const [base, setBase] = useState(null);
  const [over, setOver] = useState(null);
  const overMat = useRef();
  const first = useRef(true);

  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(url, (t) => {
      if (!alive) return;
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      coverCrop(t, PLANE_W / PLANE_H);
      if (first.current) {
        first.current = false;
        setBase(t);
      } else {
        setOver(t);
      }
    });
    return () => { alive = false; };
  }, [url]);

  useFrame((_, dt) => {
    if (over && overMat.current) {
      const o = Math.min(1, overMat.current.opacity + dt * 2.4);
      overMat.current.opacity = o;
      if (o >= 1) { setBase(over); setOver(null); }
    }
  });

  return (
    <>
      {base && (
        <mesh position={[0, -0.14, 0.256]}>
          <planeGeometry args={[PLANE_W, PLANE_H]} />
          <meshStandardMaterial map={base} roughness={0.6} />
        </mesh>
      )}
      {over && (
        <mesh position={[0, -0.14, 0.262]}>
          <planeGeometry args={[PLANE_W, PLANE_H]} />
          <meshStandardMaterial ref={overMat} map={over} roughness={0.6} transparent opacity={0} />
        </mesh>
      )}
    </>
  );
}

// Squishable silicone nose: elastic spring squash on press + colour/shape morph per animal
function Nose({ nose }) {
  const mesh = useRef();
  const mat = useRef();
  const grp = useRef();
  const st = useRef({ s: new THREE.Vector3(1, 1, 1), v: new THREE.Vector3(), pressed: false, hint: false });
  const targetColor = useMemo(() => new THREE.Color(nose?.color || "#4a342b"), [nose?.color]);
  const targetScale = useMemo(
    () => new THREE.Vector3(nose?.scale ?? 1, nose?.scale ?? 1, nose?.flat ?? 1),
    [nose?.scale, nose?.flat]
  );

  // gentle attention pulses until the user presses
  useEffect(() => {
    let stop = false;
    const pulse = (t) => setTimeout(() => {
      if (stop) return;
      st.current.hint = true;
      setTimeout(() => (st.current.hint = false), 420);
    }, t);
    const ids = [pulse(2200), pulse(4600), pulse(7200)];
    return () => { stop = true; ids.forEach(clearTimeout); };
  }, []);

  useEffect(() => {
    const up = () => (st.current.pressed = false);
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  const press = (e) => {
    e.stopPropagation();
    noseHeldUntil = performance.now() + 450;
    st.current.pressed = true;
    st.current.hint = false;
  };

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const s = st.current;
    const down = s.pressed || s.hint;
    // target squash: wider + flatter when pressed
    const tx = down ? 1.5 : 1, ty = down ? 1.5 : 1, tz = down ? 0.34 : 1;
    const springTo = (axis, target) => {
      const f = (target - s.s[axis]) * 260 - s.v[axis] * 13;
      s.v[axis] += f * dt;
      s.s[axis] += s.v[axis] * dt;
    };
    springTo("x", tx); springTo("y", ty); springTo("z", tz);
    if (mesh.current) mesh.current.scale.copy(s.s);
    if (mat.current) mat.current.color.lerp(targetColor, Math.min(1, dt * 4));
    if (grp.current) grp.current.scale.lerp(targetScale, Math.min(1, dt * 5));
  });

  return (
    <group ref={grp} position={[nose?.pos?.[0] ?? 0, nose?.pos?.[1] ?? 0.15, 0.62]}>
      <mesh
        ref={mesh}
        onPointerDown={press}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => { document.body.style.cursor = "grab"; }}
      >
        <sphereGeometry args={[0.45, 48, 48]} />
        <meshStandardMaterial ref={mat} color={nose?.color || "#4a342b"} roughness={0.28} metalness={0.03} />
      </mesh>
    </group>
  );
}

const Lens = ({ x, y, r = 0.16 }) => (
  <mesh position={[x, y, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
    <cylinderGeometry args={[r, r, 0.08, 24]} />
    <meshStandardMaterial color="#050505" roughness={0.15} metalness={0.4} />
  </mesh>
);

// Camera cutout layouts per brand, crossfaded via scale lerp
function CameraModule({ type, caseColor }) {
  const square = useRef();
  const pill = useRef();
  const bar = useRef();
  const refs = { square, pill, bar };

  useFrame((_, dt) => {
    Object.entries(refs).forEach(([k, r]) => {
      if (!r.current) return;
      const t = k === type ? 1 : 0.001;
      const s = lerp(r.current.scale.x, t, Math.min(1, dt * 7));
      r.current.scale.setScalar(s);
    });
  });

  return (
    <>
      <group ref={square}>
        <RoundedBox args={[1.2, 1.2, 0.14]} radius={0.24} smoothness={4} position={[-0.8, 2.32, 0.27]}>
          <meshStandardMaterial color={caseColor} roughness={0.35} />
        </RoundedBox>
        <Lens x={-1.05} y={2.56} />
        <Lens x={-0.58} y={2.56} />
        <Lens x={-1.05} y={2.1} />
      </group>
      <group ref={pill}>
        <RoundedBox args={[0.66, 1.9, 0.14]} radius={0.3} smoothness={4} position={[-1.05, 1.95, 0.27]}>
          <meshStandardMaterial color={caseColor} roughness={0.35} />
        </RoundedBox>
        <Lens x={-1.05} y={2.5} r={0.14} />
        <Lens x={-1.05} y={1.95} r={0.14} />
        <Lens x={-1.05} y={1.4} r={0.14} />
      </group>
      <group ref={bar}>
        <RoundedBox args={[2.6, 0.72, 0.14]} radius={0.3} smoothness={4} position={[0, 2.3, 0.27]}>
          <meshStandardMaterial color={caseColor} roughness={0.35} />
        </RoundedBox>
        <Lens x={-0.6} y={2.3} r={0.15} />
        <Lens x={-0.05} y={2.3} r={0.15} />
      </group>
    </>
  );
}

// Morph shell proportions when the phone model changes
function ShellMorph({ dims, children }) {
  const ref = useRef();
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = Math.min(1, dt * 5);
    g.scale.x = lerp(g.scale.x, dims.w, k);
    g.scale.y = lerp(g.scale.y, dims.h, k);
  });
  return <group ref={ref}>{children}</group>;
}

// Interactive rig: drag-to-rotate (mouse + touch), inertia, spring-back to front, idle spin
function CaseRig({ textureUrl, caseColor, nose, dims, cameraType, autoRotate }) {
  const grp = useRef();
  const { gl } = useThree();
  const st = useRef({ ry: 0, rx: 0, ty: 0, tx: 0, vy: 0, vx: 0, dragging: false, px: 0, py: 0, interacted: false });

  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = "none";
    el.style.cursor = "grab";
    const down = (e) => {
      if (performance.now() < noseHeldUntil) return; // nose press, don't rotate
      const s = st.current;
      s.dragging = true;
      s.interacted = true;
      s.px = e.clientX;
      s.py = e.clientY;
      s.vy = 0; s.vx = 0;
      el.style.cursor = "grabbing";
    };
    const move = (e) => {
      const s = st.current;
      if (!s.dragging) return;
      const dx = e.clientX - s.px;
      const dy = e.clientY - s.py;
      s.px = e.clientX;
      s.py = e.clientY;
      s.ty += dx * 0.009;
      s.tx = clamp(s.tx + dy * 0.005, -0.5, 0.5);
      s.vy = dx * 0.009;
      s.vx = dy * 0.005;
    };
    const up = () => {
      st.current.dragging = false;
      el.style.cursor = "grab";
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const s = st.current;
    if (!s.interacted && autoRotate) {
      s.t = (s.t || 0) + dt;
      s.ty = Math.sin(s.t * 0.7) * 0.5; // gentle idle sway, front stays visible
      s.tx = Math.sin(s.t * 0.5) * 0.05;
    } else if (!s.dragging) {
      s.ty += s.vy;
      s.tx = clamp(s.tx + s.vx, -0.5, 0.5);
      s.vy *= 0.86;
      s.vx *= 0.86;
      // continuous gentle pull back to the front-facing angle
      s.ty = lerp(s.ty, 0, dt * 2.4);
      s.tx = lerp(s.tx, 0, dt * 2.4);
    }
    s.ry = lerp(s.ry, s.ty, Math.min(1, dt * 9));
    s.rx = lerp(s.rx, s.tx, Math.min(1, dt * 9));
    if (grp.current) grp.current.rotation.set(s.rx + 0.02, s.ry, 0);
  });

  return (
    <group ref={grp}>
      <group rotation={[0, 0, 0.02]}>
        <ShellMorph dims={dims}>
          <RoundedBox args={[3.2, 6.6, 0.5]} radius={0.26} smoothness={8}>
            <meshStandardMaterial color={caseColor} roughness={0.45} />
          </RoundedBox>
          <PrintPlane url={textureUrl} />
          <CameraModule type={cameraType} caseColor={caseColor} />
        </ShellMorph>
        <Nose nose={nose} />
      </group>
    </group>
  );
}

export default function Case3DScene({ textureUrl, caseColor, nose, dims, cameraType, autoRotate, frameloop, cameraZ = 10.5, onReady }) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, cameraZ], fov: 38 }}
      gl={{ antialias: true }}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} />
      <directionalLight position={[-5, -2, 4]} intensity={0.45} color="#ffe0dc" />
      <CaseRig textureUrl={textureUrl} caseColor={caseColor} nose={nose} dims={dims} cameraType={cameraType} autoRotate={autoRotate} />
      <ContactShadows position={[0, -4.4, 0]} opacity={0.28} scale={12} blur={2.8} far={6} />
    </Canvas>
  );
}
