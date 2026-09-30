import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "./Spinner";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  /** Text shown next to the spinner while isLoading is true. */
  loadingText?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-300 disabled:bg-indigo-300",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus-visible:ring-indigo-200 disabled:text-slate-400 disabled:bg-slate-50",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-indigo-200 disabled:text-slate-300",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      isLoading = false,
      loadingText,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || isLoading;

    return (
      <button
        {...props}
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
          "text-sm font-semibold transition-colors duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          fullWidth ? "w-full" : "",
          VARIANT_CLASSES[variant],
          className,
        ].join(" ")}
      >
        {isLoading && <Spinner className="h-4 w-4" />}
        {isLoading && loadingText ? loadingText : children}
      </button>
    );
  },
);