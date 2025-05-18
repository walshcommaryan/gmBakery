import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  // Declare hooks first
  const { login, register, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Now your useEffect is always called, no matter what
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

    // Early return after hooks are declared
  if (!isOpen) return null;

  const clearInputs = () => {
    // Clear email and password fields after submit attempt for security
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
  }

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
    setLocalError(isLogin ? 'Invalid email or password' : 'Registration failed');
  }

  clearInputs();
  setLoading(false);
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isLogin ? null : (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={!isLogin}
                className="login-field"
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={!isLogin}
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
          <AnimatePresence>
            {!loading ? (
              <motion.button
                key="login"
                type="submit"
                className="btn-checkout"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                disabled={loading}
              >
                {isLogin ? 'Login' : 'Register'}
              </motion.button>
            ) : (
              <motion.div
                key="loading"
                className="flex justify-center items-center gap-2 text-sm text-gray-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="animate-spin h-5 w-5 text-cyan-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Logging in...
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-sm text-blue-500 underline"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
          >
            {isLogin ? 'New user? Register' : 'Already have an account? Login'}
          </button>
          <div className="mt-2">
            <button
              onClick={onClose}
              className="text-sm text-gray-500 underline"
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
