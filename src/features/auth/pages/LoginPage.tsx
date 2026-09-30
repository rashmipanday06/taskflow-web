import type { LoginFormProps } from "../components/LoginForm";
import { AuthCard } from "../../../components/ui/AuthCard";
import { LoginForm } from "../components/LoginForm";
import { Link } from "react-router";

export interface LoginPageProps extends LoginFormProps {
  onNavigateRegister?: () => void;
}

/**
 * The login SCREEN: decides layout, heading copy, and footer link.
 * Delegates all form behavior to LoginForm — this file has no fields,
 * no validation, no submit logic of its own.
 */
export default function LoginPage({
  ...formProps
}: LoginPageProps) {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            type="button"
          to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 rounded"
          >
            Create one
          </Link>
        </>
      }
    >
      <LoginForm {...formProps} />
    </AuthCard>
  );
}