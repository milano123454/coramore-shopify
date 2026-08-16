import { useEffect, useState } from "react";
import { Truck } from "lucide-react";

// Live "order within HH:MM:SS, receive by [weekday, date]" line
export const DeliveryEstimate = ({ cfg }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const cutoff = new Date(now);
  cutoff.setHours(cfg.cutoffHour, 0, 0, 0);
  if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1);

  const diff = Math.max(0, cutoff - now);
  const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  const delivery = new Date(now);
  let added = 0;
  while (added < cfg.daysToDeliver) {
    delivery.setDate(delivery.getDate() + 1);
    if (delivery.getDay() !== 0) added += 1; // skip Sundays
  }
  const dateStr = delivery.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-trustpilot/25 bg-trustpilot/[0.07] px-5 py-4 text-sm" data-testid="delivery-estimate">
      <Truck size={18} className="shrink-0 text-trustpilot" />
      <p className="font-semibold">
        {cfg.textBefore}{" "}
        <span className="font-mono font-black text-flame" data-testid="delivery-countdown">{hh}:{mm}:{ss}</span>{" "}
        {cfg.textAfter}{" "}
        <span className="font-black" data-testid="delivery-date">{dateStr}</span>
      </p>
    </div>
  );
};

export default DeliveryEstimate;
