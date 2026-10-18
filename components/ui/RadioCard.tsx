import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RadioCardProps {
  selected: boolean;
  onSelect: () => void;
  icon: ReactNode;
  title: string;
  description?: string;
  trailing?: ReactNode;
}

export function RadioCard({
  selected,
  onSelect,
  icon,
  title,
  description,
  trailing,
}: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-card border p-4 text-left transition-colors",
        selected
          ? "border-primary bg-primary-light"
          : "border-border hover:border-primary/50"
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-primary" : "border-border"
        )}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      <span className="text-xl">{icon}</span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-text">{title}</span>
        {description && (
          <span className="block text-xs text-text-muted">{description}</span>
        )}
      </span>
      {trailing && <span className="text-sm font-medium text-text">{trailing}</span>}
    </button>
  );
}
