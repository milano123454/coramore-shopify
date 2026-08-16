import { Star } from "lucide-react";

// Trustpilot-style green star squares with partial fill support
export const TrustpilotStars = ({ value = 5, size = 18, gap = 3, className = "", testId }) => {
  const box = size + 8;
  return (
    <div className={`flex items-center ${className}`} style={{ gap }} role="img" aria-label={`${value} su 5 stelle`} data-testid={testId}>
      {[0, 1, 2, 3, 4].map((i) => {
        const f = Math.min(1, Math.max(0, value - i));
        return (
          <span
            key={i}
            className="flex items-center justify-center rounded-[3px]"
            style={{ width: box, height: box, background: `linear-gradient(90deg, #00B67A ${f * 100}%, #C9C9D4 ${f * 100}%)` }}
          >
            <Star size={size} fill="#fff" strokeWidth={0} color="#fff" />
          </span>
        );
      })}
    </div>
  );
};

export default TrustpilotStars;
