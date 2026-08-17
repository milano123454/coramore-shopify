import { Star } from "lucide-react";

const Stars = ({ rating = 5, size = 16 }) => (
  <div className="flex gap-0.5" data-testid="star-rating">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        strokeWidth={1.8}
        className={i < Math.round(rating) ? "fill-[#FFE066] text-foreground" : "text-foreground/25"}
      />
    ))}
  </div>
);

export default Stars;
