import type { ReactNode } from "react";

type AlertVariant = "error" | "success" | "info";

interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
}

const VARIANT_STYLES: Record<
  AlertVariant,
  { wrapper: string; icon: ReactNode }
> = {
  error: {
    wrapper: "border-rose-200 bg-rose-50 text-rose-700",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 7Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  success: {
    wrapper: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.53-9.72a.75.75 0 0 0-1.06-1.06L9 10.69l-1.47-1.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  info: {
    wrapper: "border-indigo-200 bg-indigo-50 text-indigo-700",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM9 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1Zm1 3a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

/** Form-level message banner. error uses role="alert"; success/info use role="status". */
export function Alert({ variant, children }: AlertProps) {
  const { wrapper, icon } = VARIANT_STYLES[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm ${wrapper}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}