import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-pastryWhite font-bakery flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-cream rounded-2xl shadow-xl p-8 border border-chocolate/5">
          <div className="flex justify-end mb-4">
            <button className="btn-nav text-sm" onClick={() => navigate("/")}>
              &larr; Home
            </button>
          </div>
          <h2 className="text-2xl font-seasons text-chocolate text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-field"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="button-submit flex items-center justify-center min-h-[48px] disabled:opacity-70"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md text-cream"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
