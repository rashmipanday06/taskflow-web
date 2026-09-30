import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Rendered below the card, e.g. "Don't have an account? Sign up" */
  footer?: ReactNode;
}

/**
 * Shared shell for every auth screen: logo, heading, card, footer link.
 * Responsive: full-bleed on mobile, centered fixed-width card from sm+ up.
 */
export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo slot — swap for your real logo/mark */}
        <div className="mb-8 flex justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-base font-bold text-white">
            JIRA
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center sm:text-left">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>

        {footer && (
          <p className="mt-6 text-center text-sm text-slate-600">{footer}</p>
        )}
      </div>
    </div>
  );
}