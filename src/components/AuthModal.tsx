import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

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

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  if (!isOpen) return null;

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
      onClose();
    } else {
      setLocalError(
        isLogin ? "Invalid email or password" : "Registration failed",
      );
    }

    clearInputs();
    setLoading(false);
  };

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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-field"
            disabled={loading}
          />
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
      </div>
    </div>
  );
};

export default AuthModal;
