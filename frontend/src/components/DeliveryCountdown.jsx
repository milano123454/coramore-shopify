import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

const pad = (n) => String(n).padStart(2, "0");

const DeliveryCountdown = ({ cutoffHour = 14, cutoffLabel = "2pm", compact = false }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const cutoff = new Date(now);
      cutoff.setHours(cutoffHour, 0, 0, 0);
      let target = cutoff;
      let day = "today";
      if (now >= cutoff) {
        target = new Date(cutoff.getTime() + 86400000);
        day = "tomorrow";
      }
      const d = target - now;
      setInfo({
        day,
        h: Math.floor(d / 3600000),
        m: Math.floor((d % 3600000) / 60000),
        s: Math.floor((d % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [cutoffHour]);

  if (!info) return null;

  if (compact) {
    return (
      <div data-testid="delivery-countdown" className="flex items-center gap-2 text-sm font-semibold">
        <span className="bg-accent border-2 border-foreground rounded-full p-1.5">
          <Truck size={14} />
        </span>
        <p>
          Order within{" "}
          <span data-testid="delivery-timer" className="text-primary font-bold tabular-nums">
            {pad(info.h)}h {pad(info.m)}m {pad(info.s)}s
          </span>{" "}
          for dispatch {info.day}
        </p>
      </div>
    );
  }

  return (
    <div
      data-testid="delivery-countdown"
      className="flex items-center gap-3 border-2 border-foreground bg-white rounded-lg p-3 tactile-shadow-sm"
    >
      <span className="bg-accent border-2 border-foreground rounded-full p-2">
        <Truck size={18} />
      </span>
      <p className="text-sm font-semibold">
        Order within{" "}
        <span data-testid="delivery-timer" className="text-primary font-bold tabular-nums">
          {pad(info.h)}h {pad(info.m)}m {pad(info.s)}s
        </span>{" "}
        for dispatch {info.day} <span className="text-muted-foreground font-medium">(cutoff {cutoffLabel})</span>
      </p>
    </div>
  );
};

export default DeliveryCountdown;
