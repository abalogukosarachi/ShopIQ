import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Info", "Address", "Delivery", "Payment", "Review"];

export function CheckoutStepper({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold",
                  isDone && "bg-success text-white",
                  isActive && !isDone && "bg-primary text-white",
                  !isDone && !isActive && "bg-gray-100 text-text-muted"
                )}
              >
                {isDone ? <Check size={14} /> : stepNum}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] sm:block",
                  isActive ? "font-medium text-text" : "text-text-muted"
                )}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1",
                  isDone ? "bg-success" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
