import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/index";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { email, token, password });
      setSuccess(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Could not reset password. Please try again.";
      setError(msg);
    }
    setLoading(false);
  };

  const isTokenError =
    error &&
    (error.toLowerCase().includes("token") ||
      error.toLowerCase().includes("expired"));

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pastryWhite font-bakery">
        <div className="bg-cream rounded-2xl shadow-xl p-8 max-w-sm w-full border border-chocolate/5">
          <h2 className="text-2xl font-seasons mb-4 text-chocolate">
            Password Reset Successful
          </h2>
          <p className="mb-6 text-milkChocolate">
            You can now log in with your new password.
          </p>
          <a href="/?login=true" className="btn-primary inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (isTokenError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pastryWhite font-bakery">
        <div className="bg-cream rounded-2xl shadow-xl p-8 max-w-sm w-full border border-chocolate/5 text-center">
          <h2 className="text-2xl font-seasons mb-4 text-chocolate">
            Link Expired or Invalid
          </h2>
          <p className="mb-6 text-milkChocolate">
            Your password reset link is invalid or has expired.
          </p>
          <a href="/?login=true" className="btn-primary inline-block">
            Back to Login
          </a>
          <p className="mt-4 text-sm text-milkChocolate">
            Need a new link?{" "}
            <a
              href="/forgot-password"
              className="text-warmGold hover:text-chocolate transition-colors"
            >
              Request password reset
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pastryWhite font-bakery px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-cream rounded-2xl shadow-xl p-8 max-w-sm w-full flex flex-col gap-4 border border-chocolate/5"
      >
        <h2 className="text-2xl font-seasons text-center text-chocolate mb-2">
          Reset Your Password
        </h2>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-field w-full pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-whiteChocolate hover:text-milkChocolate transition-colors"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="login-field w-full pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-whiteChocolate hover:text-milkChocolate transition-colors"
            onClick={() => setShowConfirm((v) => !v)}
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? (
              <EyeSlashIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="button-submit flex items-center justify-center min-h-[48px]"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md text-cream"></span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
