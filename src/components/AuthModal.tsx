import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { forgotPassword as apiForgotPassword } from "../api/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-chocolate/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-cream rounded-2xl shadow-2xl w-full max-w-sm p-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {loginRequired && (
            <div className="text-center mb-4 py-2 px-3 bg-warmGold/10 rounded-xl border border-warmGold/20">
              <p className="text-sm text-chocolate font-medium">
                Please login to proceed to checkout
              </p>
            </div>
          )}

          <h2 className="text-2xl font-seasons text-chocolate text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* Alert Message */}
          {alert && (
            <div
              role="alert"
              className={`alert ${
                alert.type === "success" ? "alert-success" : "alert-error"
              } flex items-center gap-2 shadow-lg mb-4 rounded-xl text-sm`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0 stroke-current"
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
                  className="text-sm text-milkChocolate hover:text-chocolate transition-colors"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotSent(false);
                    setForgotEmail("");
                    setAlert(null);
                  }}
                >
                  &larr; Back to Login
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
                  className="button-submit flex items-center justify-center min-h-[48px] disabled:opacity-70"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md text-cream"></span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
                <button
                  type="button"
                  className="text-sm text-milkChocolate hover:text-chocolate transition-colors"
                  onClick={() => setShowForgot(false)}
                  disabled={loading}
                >
                  &larr; Back to Login
                </button>
              </form>
            )
          ) : (
            <>
              {/* Login/Register Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="login-field"
                        disabled={loading}
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="login-field"
                        disabled={loading}
                      />
                    </div>
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
                    className="login-field w-full pr-10"
                    disabled={loading}
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
                {isLogin && (
                  <button
                    type="button"
                    className="text-xs text-warmGold hover:text-chocolate text-left w-fit transition-colors"
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
                  className="button-submit relative flex items-center justify-center min-h-[48px] mt-2 disabled:opacity-70"
                >
                  <span className={loading ? "invisible" : ""}>
                    {isLogin ? "Sign In" : "Create Account"}
                  </span>
                  {loading && (
                    <span className="absolute">
                      <span className="loading loading-spinner loading-md text-cream"></span>
                    </span>
                  )}
                </button>
              </form>
              <div className="mt-5 text-center space-y-2">
                <button
                  className="text-sm text-milkChocolate hover:text-chocolate transition-colors"
                  onClick={() => setIsLogin(!isLogin)}
                  disabled={loading}
                >
                  {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
                </button>
                <div>
                  <button
                    onClick={onClose}
                    className="text-xs text-whiteChocolate hover:text-milkChocolate transition-colors"
                    disabled={loading}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
