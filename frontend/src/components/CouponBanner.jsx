import { useEffect, useState } from "react";
import { Copy, TicketPercent } from "lucide-react";
import { toast } from "sonner";

const pad = (n) => String(n).padStart(2, "0");

const CouponBanner = ({ coupon }) => {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const d = Math.max(0, end - now);
      const h = Math.floor(d / 3600000);
      const m = Math.floor((d % 3600000) / 60000);
      const s = Math.floor((d % 60000) / 1000);
      setRemaining(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      toast.success(`Code ${coupon.code} copied — go be brave at checkout`);
    } catch {
      toast.info(`Your code: ${coupon.code}`);
    }
  };

  return (
    <div
      data-testid="coupon-banner"
      className="border-2 border-foreground bg-secondary rounded-lg p-3 flex items-center justify-between gap-3 flex-wrap tactile-shadow-sm"
    >
      <div className="flex items-center gap-2 font-semibold text-sm">
        <TicketPercent size={18} />
        <span>{coupon.message}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          data-testid="coupon-code-chip"
          onClick={copyCode}
          className="flex items-center gap-1.5 bg-white border-2 border-dashed border-foreground rounded-md px-3 py-1 font-bold text-sm hover:bg-accent transition-colors"
        >
          {coupon.code} <Copy size={14} />
        </button>
        <span data-testid="coupon-countdown" className="font-headings font-semibold text-sm tabular-nums bg-foreground text-white rounded-md px-2.5 py-1">
          {remaining}
        </span>
      </div>
    </div>
  );
};

export default CouponBanner;
