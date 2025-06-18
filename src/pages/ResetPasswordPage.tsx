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

  // Handle invalid/expired token error
  const isTokenError =
    error &&
    (error.toLowerCase().includes("token") ||
      error.toLowerCase().includes("expired"));

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pastryWhite font-bakery">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full border border-[#f6e6c8]">
          <h2 className="text-2xl font-bold mb-4 text-[#422b24] font-seasons">
            Password Reset Successful
          </h2>
          <p className="mb-4 text-[#422b24]">
            You can now log in with your new password.
          </p>
          <a
            href="/?login=true"
            className="bg-[#422b24] hover:bg-[#6d4c41] text-white font-bold py-2 px-6 rounded transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Show token error UI
  if (isTokenError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pastryWhite font-bakery">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full border border-[#f6e6c8] text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#422b24] font-seasons">
            Link Expired or Invalid
          </h2>
          <p className="mb-4 text-[#422b24]">
            Your password reset link is invalid or has expired.
          </p>
          <a
            href="/?login=true"
            className="bg-[#422b24] hover:bg-[#6d4c41] text-white font-bold py-2 px-6 rounded transition inline-block"
          >
            Back to Login
          </a>
          <p className="mt-4 text-sm text-[#422b24]">
            Need a new link?{" "}
            <a
              href="/forgot-password"
              className="underline text-[#422b24] hover:text-[#6d4c41]"
            >
              Request password reset
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pastryWhite font-bakery">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col gap-4 border border-[#f6e6c8]"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-[#422b24] font-seasons">
          Reset Your Password
        </h2>
        {/* Password Field with Eye Icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-field text-black border border-[#f6e6c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f6e6c8] w-full pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {/* Confirm Password Field with Eye Icon */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="login-field border text-black border-[#f6e6c8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f6e6c8] w-full pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirm((v) => !v)}
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-[#422b24] hover:bg-[#6d4c41] text-white font-bold py-2 px-6 rounded transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md text-white"></span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;