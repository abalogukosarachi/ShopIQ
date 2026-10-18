import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImagePlaceholderProps {
  label: string;
  className?: string;
}

/**
 * Consistent stand-in for a real product photo. Every product image slot
 * uses this until a real photo is dropped into /public/products/ — keeps
 * the grid looking uniform instead of mismatched or broken image icons.
 */
export function ProductImagePlaceholder({
  label,
  className,
}: ProductImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 bg-gray-50 text-text-muted",
        className
      )}
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      <span className="px-2 text-center text-[11px] leading-tight">
        {label}
      </span>
    </div>
  );
}
