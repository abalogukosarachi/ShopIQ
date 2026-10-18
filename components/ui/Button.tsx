import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "gold";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:scale-[0.98]",
  secondary:
    "bg-white text-primary border border-primary hover:bg-primary-light active:scale-[0.98]",
  success:
    "bg-success text-white hover:brightness-95 active:scale-[0.98]",
  danger:
    "bg-danger text-white hover:brightness-95 active:scale-[0.98]",
  gold: "bg-gold text-white hover:brightness-95 active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/**
 * ShopIQ's single Button component. Every button on the site — Add to
 * Cart, Checkout, Remove Item, Save, Flash Deal CTAs — uses this with a
 * different `variant`, never a one-off styled <button>.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-button font-medium transition-all duration-150",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
