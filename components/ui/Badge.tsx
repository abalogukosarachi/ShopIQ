import { cn } from "@/lib/utils";

export type BadgeTone =
  | "success" // In Stock / Free Delivery
  | "warning" // Limited stock / Flash Sale
  | "danger" // Out of Stock
  | "gold" // Best Seller / Premium
  | "primary" // New Arrival
  | "neutral"; // Organic / Frozen / informational

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const toneStyles: Record<BadgeTone, string> = {
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
  gold: "bg-gold-light text-gold",
  primary: "bg-primary-light text-primary",
  neutral: "bg-gray-100 text-text-muted",
};

/**
 * Product label badge. Used for stock status and marketing labels like
 * "🔥 Hot Deal", "⭐ Best Seller", "🆕 New Arrival", "Save 15%".
 */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
