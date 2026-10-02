import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { AuthCard } from "../../../components/ui/AuthCard";
import { LoginForm } from "../components/LoginForm";
import { login } from "../authApi";
import { setCredentials } from "../authSlice";
import type { LoginCredentials } from "../authTypes";
import type { AppDispatch } from "../../../store/store";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleLogin = (credentials: LoginCredentials) => {
    setIsLoading(true);
    setErrorMessage(undefined);

    login(credentials)
      .then((response) => {
        dispatch(setCredentials(response));
        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 rounded"
          >
            Create one
          </Link>
        </>
      }
    >
      <LoginForm
        isLoading={isLoading}
        errorMessage={errorMessage}
        onSubmit={handleLogin}
      />
    </AuthCard>
  );
}