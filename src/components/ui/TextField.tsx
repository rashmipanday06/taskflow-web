import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  /** Shown below the field in red; also sets aria-invalid. */
  error?: string;
  /** Shown below the field in green when there's no error. */
  success?: string;
  /** Neutral helper text shown when there's no error or success. */
  hint?: string;
  /** Optional element rendered inside the field on the right (e.g. a toggle button). */
  endAdornment?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      error,
      success,
      hint,
      endAdornment,
      className = "",
      required,
      ...props
    },
    ref,
  ) {
    const id = useId();
    const messageId = `${id}-message`;
    const message = error || success || hint;

    return (
      <div className="space-y-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
          {required && (
            <span className="ml-0.5 text-rose-500" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <div className="relative">
          <input
            {...props}
            id={id}
            ref={ref}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={message ? messageId : undefined}
            className={[
              "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900",
              "placeholder:text-slate-400",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
              endAdornment ? "pr-11" : "",
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100",
              className,
            ].join(" ")}
          />

          {endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              {endAdornment}
            </div>
          )}
        </div>

        {message && (
          <p
            id={messageId}
            className={[
              "text-xs",
              error
                ? "text-rose-600"
                : success
                  ? "text-emerald-600"
                  : "text-slate-500",
            ].join(" ")}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);