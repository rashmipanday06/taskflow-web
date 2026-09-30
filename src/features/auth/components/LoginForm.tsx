import type { FormEvent } from "react";
import { Alert } from "../../../components/ui/Alert";
import { TextField } from "../../../components/ui/TextField";
import { PasswordField } from "../../../components/ui/PasswordField";
import { Button } from "../../../components/ui/Button";

export interface LoginFormProps {
  /** Controlled from outside — this component has no auth/validation logic of its own. */
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onForgotPassword?: () => void;
}

/**
 * The login form itself: fields, states, submit button.
 * Knows nothing about page layout, logo, or "Don't have an account?" footer —
 * that's LoginPage's job. This component only knows how to BE a login form.
 */
export function LoginForm({
  isLoading = false,
  errorMessage,
  successMessage,
  onSubmit,
  onForgotPassword,
}: LoginFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      noValidate
      className="space-y-5"
    >
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <TextField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        required
      />

      <div>
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />

        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 rounded"
          >
            Forgot password?
          </button>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          name="remember"
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-200"
        />
        Keep me signed in
      </label>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        loadingText="Signing in…"
      >
        Sign in
      </Button>
    </form>
  );
}