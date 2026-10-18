import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number; // 0-5
  reviewCount?: number;
  size?: number;
  className?: string;
}

/** ⭐⭐⭐⭐☆ 4.6 (248 Reviews) — used on cards, product pages, and reviews. */
export function RatingStars({
  rating,
  reviewCount,
  size = 14,
  className,
}: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(rating)
                ? "fill-gold text-gold"
                : "fill-none text-border"
            }
          />
        ))}
      </div>
      <span className="text-xs font-medium text-text">{rating.toFixed(1)}</span>
      {typeof reviewCount === "number" && (
        <span className="text-xs text-text-muted">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
