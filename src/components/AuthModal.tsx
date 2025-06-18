import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { forgotPassword as apiForgotPassword } from "../api/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginRequired?: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  loginRequired,
}) => {
  const { login, register, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500));

    let success = false;

    if (isLogin) {
      success = await login(email, password);
    } else {
      success = await register(firstName, lastName, email, password, phone);
    }

    if (success) {
      setAlert({ type: "success", message: isLogin ? "Login successful!" : "Registration successful!" });
      setTimeout(onClose, 1500);
    } else {
      setLocalError(
        isLogin ? "Invalid email or password" : "Registration failed",
      );
      setAlert({ type: "error", message: isLogin ? "Invalid email or password" : "Registration failed" });
    }

    clearInputs();
    setLoading(false);
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setLoading(true);
    try {
      await apiForgotPassword(forgotEmail);
      setForgotSent(true);
      setAlert({ type: "success", message: "Reset link sent! Check your email." });
    } catch (err) {
      setForgotError("Could not send reset email.");
      setAlert({ type: "error", message: "Could not send reset email." });
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {loginRequired && (
          <p className="text-red-600 font-bold mb-4 text-center">
            You must login first to proceed to checkout.
          </p>
        )}
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Alert Message */}
        {alert && (
          <div
            role="alert"
            className={`alert ${
              alert.type === "success" ? "alert-success" : "alert-error"
            } flex items-center gap-2 shadow-lg mb-4`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  alert.type === "success"
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M6 18L18 6M6 6l12 12"
                }
              />
            </svg>
            <span>{alert.message}</span>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgot ? (
          forgotSent ? (
            <div className="text-center">
              <button
                className="btn-nav text-sm text-gray-500"
                onClick={() => {
                  setShowForgot(false);
                  setForgotSent(false);
                  setForgotEmail("");
                  setAlert(null);
                }}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="login-field"
                disabled={loading}
              />
              {forgotError && (
                <p className="text-red-500 text-sm">{forgotError}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="btn-nav flex items-center justify-center px-10 text-lg min-h-[48px] disabled:opacity-70"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md text-black"></span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
              <button
                type="button"
                className="text-sm text-gray-500 underline"
                onClick={() => setShowForgot(false)}
                disabled={loading}
              >
                Back to Login
              </button>
            </form>
          )
        ) : (
          <>
            {/* Login/Register Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="login-field"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="login-field"
                    disabled={loading}
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="login-field"
                    disabled={loading}
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-field"
                disabled={loading}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-field w-full"
                  disabled={loading}
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
              {/* Forgot Password Link */}
              {isLogin && (
                <button
                  type="button"
                  className="text-xs text-blue-500 underline text-left w-fit"
                  onClick={() => setShowForgot(true)}
                  disabled={loading}
                >
                  Forgot password?
                </button>
              )}
              {localError && <p className="text-red-500 text-sm">{localError}</p>}
              <button
                type="submit"
                disabled={loading}
                className="btn-nav relative flex items-center justify-center px-10 text-lg min-h-[48px] disabled:opacity-70"
              >
                <span className={loading ? "invisible" : ""}>
                  {isLogin ? "Login" : "Register"}
                </span>
                {loading && (
                  <span className="absolute">
                    <span className="loading loading-spinner loading-md text-black"></span>
                  </span>
                )}
              </button>
            </form>
            {/* Switch and Close buttons */}
            <div className="mt-4 text-center">
              <button
                className="text-sm text-blue-500 underline"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading}
              >
                {isLogin ? "New user? Register" : "Already have an account? Login"}
              </button>
              <div className="mt-2">
                <button
                  onClick={onClose}
                  className="btn-nav text-sm text-gray-500"
                  disabled={loading}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
