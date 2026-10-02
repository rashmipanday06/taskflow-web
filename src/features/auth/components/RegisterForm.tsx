import { useState, type FormEvent } from "react";
import {authService} from "../services/authService";
import { TextField } from "../../../components/ui/TextField";
import { PasswordField } from "../../../components/ui/PasswordField";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Temporary submission simulation.
      // API integration will be added later.
      const response = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      console.log("Registration successful:", response.user);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {Object.keys(errors).length > 0 && (
        <Alert variant="error">
          Please fix the errors below.
        </Alert>
      )}

      <TextField
        label="Full name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        error={errors.name}
        autoComplete="name"
      />

      <TextField
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        autoComplete="email"
      />

      <PasswordField
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
          setErrors((prev) => ({
            ...prev,
            password: undefined,
            confirmPassword: undefined,
          }));
        }}
        error={errors.password}
        autoComplete="new-password"
      />

      <PasswordField
        label="Confirm password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value);
          setErrors((prev) => ({
            ...prev,
            confirmPassword: undefined,
          }));
        }}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        loadingText="Creating account..."
      >
        Create account
      </Button>
    </form>
  );
}