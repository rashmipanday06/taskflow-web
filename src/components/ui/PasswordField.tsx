import { forwardRef, useId, useState } from "react";
import { TextField } from "./TextField";
import type { TextFieldProps } from "./TextField";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "endAdornment">;

const EyeIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
    <path
      d="M1.5 10S4.5 4 10 4s8.5 6 8.5 6-3 6-8.5 6-8.5-6-8.5-6Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4.5 w-4.5" aria-hidden="true">
    <path
      d="M2.5 2.5l15 15M8.03 8.06A2.25 2.25 0 0 0 10 11.75c.57 0 1.09-.2 1.5-.53M6.2 6.24C3.7 7.53 2 10 2 10s3 6 8 6c1.36 0 2.55-.44 3.56-1.08M9.02 4.06c.32-.04.65-.06.98-.06 5 0 8 6 8 6a13.8 13.8 0 0 1-2.32 3.16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Wraps TextField with a show/hide toggle. The toggle is local UI state only —
 * it does not validate, hash, or otherwise touch the password value.
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(props, ref) {
    const [visible, setVisible] = useState(false);
    const toggleId = useId();

    return (
      <TextField
        {...props}
        ref={ref}
        type={visible ? "text" : "password"}
        endAdornment={
          <button
            type="button"
            id={toggleId}
            onClick={() => setVisible((v) => !v)}
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
            className="rounded p-1.5 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
    );
  },
);