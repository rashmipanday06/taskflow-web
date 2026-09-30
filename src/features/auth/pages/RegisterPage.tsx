import { Link } from "react-router-dom";


import { RegisterForm } from "../components/RegisterForm";
import { AuthCard } from "../../../components/ui/AuthCard";


export function RegistrationPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Get started with TaskFlow today."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}