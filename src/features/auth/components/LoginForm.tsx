import type {FormEvent } from "react";
import { Alert } from "../../../components/ui/Alert";
import { TextField } from "../../../components/ui/TextField";
import { PasswordField } from "../../../components/ui/PasswordField";
import { Button } from "../../../components/ui/Button";
import type { LoginCredentials } from "../authTypes";

export interface LoginFormProps {
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  onSubmit?: (credentials: LoginCredentials) => void;
  onForgotPassword?: () => void;
}

const LoginForm = (props: LoginFormProps) => {
  const {
    isLoading,
    errorMessage,
    successMessage,
    onSubmit,
    onForgotPassword
  } = props;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const credentials: LoginCredentials = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    onSubmit?.(credentials);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
export { LoginForm };