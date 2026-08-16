import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Check, Clock, Tag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

// Premium dashed coupon card: shimmer, APPLY -> APPLIED ✓, live countdown
export const CouponCard = ({ coupon }) => {
  const { applyCoupon, coupon: appliedCoupon } = useCart();
  const [state, setState] = useState(appliedCoupon ? "done" : "idle");
  const [secs, setSecs] = useState(coupon.durationMinutes * 60);
  const btnRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { if (appliedCoupon) setState("done"); }, [appliedCoupon]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  const apply = async () => {
    if (state !== "idle") return;
    setState("applying");
    await new Promise((r) => setTimeout(r, 650));
    applyCoupon(coupon.code);
    setState("done");
    const r = btnRef.current?.getBoundingClientRect();
    confetti({
      particleCount: 90,
      spread: 75,
      startVelocity: 32,
      origin: r ? { x: (r.left + r.width / 2) / window.innerWidth, y: r.top / window.innerHeight } : { y: 0.6 },
      colors: ["#F2542D", "#00B67A", "#FFA8C5", "#121212"],
    });
    toast.success(coupon.successToast);
  };

  return (
    <div className="coupon-border relative overflow-hidden rounded-2xl border-2 border-dashed bg-white p-5" data-testid="coupon-card">
      <div className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-flame/[0.07] to-transparent shimmer-sweep" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 rounded-full bg-flame px-3 py-1 text-xs font-black uppercase tracking-wide text-white" data-testid="coupon-tag">
            <Tag size={12} /> {coupon.tag}
          </span>
          <p className="text-sm font-bold" data-testid="coupon-title">{coupon.title.replace("{percent}", coupon.percent)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-stretch gap-3">
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-ink/25 bg-cream px-4 py-3 font-mono text-lg font-black tracking-[0.2em]" data-testid="coupon-code">
          {coupon.code}
        </div>
        <motion.button
          ref={btnRef}
          onClick={apply}
          disabled={state !== "idle"}
          whileTap={{ scale: 0.96 }}
          className={`flex min-w-32 items-center justify-center gap-2 rounded-xl px-6 font-display text-base font-bold text-white transition-colors duration-300 ${state === "done" ? "bg-trustpilot" : "bg-ink hover:bg-flame"} disabled:cursor-default`}
          data-testid="coupon-apply-button"
        >
          {state === "applying" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : state === "done" ? (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 12 }} className="flex items-center gap-2">
              <Check size={18} strokeWidth={3} /> {coupon.appliedLabel}
            </motion.span>
          ) : (
            coupon.applyLabel
          )}
        </motion.button>
      </div>

      <div className="mt-3.5 flex items-center gap-2 text-xs font-semibold text-smoke" data-testid="coupon-countdown">
        <Clock size={13} className="text-flame" />
        {coupon.expiryLabel}
        <span className="flex items-center gap-0.5 font-mono text-sm font-black text-flame">
          <motion.span key={mm} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{mm}</motion.span>
          :
          <motion.span key={ss} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{ss}</motion.span>
        </span>
      </div>
    </div>
  );
};

export default CouponCard;
