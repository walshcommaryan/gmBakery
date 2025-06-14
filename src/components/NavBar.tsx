import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CheckOutButton from "./CheckOutButton";
import AuthModal from "./AuthModal";
import CheckoutModal from "./CheckoutModal";
import CheckoutPage from "../pages/CheckoutPage";
import { MenuButton } from "./MenuButton";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCheckoutOpen ? "hidden" : "unset";
  }, [isCheckoutOpen]);

  const openLoginModal = (required = false) => {
    setLoginRequired(required);
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    clearCart(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between p-4 items-center relative">
      {/* Logo */}
      <div>
        <img
          src="/assets/images/logo.png"
          alt="Pastry"
          className="w-12 sm:w-16 md:w-24 object-contain"
        />
      </div>

      {/* Desktop Nav */}
      <div className="hidden sm:flex flex-row items-center gap-4">
        <Link to="/about" className="btn-nav">
          About
        </Link>
        <Link to="/location" className="btn-nav">
          Locations
        </Link>
        {user ? (
          <div className="relative group">
            <span className="btn-nav cursor-pointer">
              Welcome, {user.first_name}
            </span>
            <div className="absolute left-0 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-gray-200 opacity-0 group-hover:opacity-100 transition duration-150 z-10">
              <Link
                to="/order-history"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Order History
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button className="btn-nav" onClick={() => openLoginModal(false)}>
            Login
          </button>
        )}
        <CheckOutButton
          openLoginModal={openLoginModal}
          openCheckoutModal={() => setIsCheckoutOpen(true)}
        />
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden">
        <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white shadow-md z-20 flex flex-col gap-4 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/about"
              className="btn-nav"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/location"
              className="btn-nav"
              onClick={() => setIsOpen(false)}
            >
              Locations
            </Link>
            {user ? (
              <>
                <span className="btn-nav">Welcome, {user.first_name}</span>
                <Link
                  to="/order-history"
                  className="btn-nav"
                  onClick={() => setIsOpen(false)}
                >
                  Order History
                </Link>
                <button
                  className="btn-nav"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="btn-nav"
                onClick={() => {
                  openLoginModal(false);
                  setIsOpen(false);
                }}
              >
                Login
              </button>
            )}
            <CheckOutButton
              openLoginModal={openLoginModal}
              openCheckoutModal={() => {
                setIsCheckoutOpen(true);
                setIsOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AuthModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setLoginRequired(false);
        }}
        loginRequired={loginRequired}
      />

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)}>
          <CheckoutPage onClose={() => setIsCheckoutOpen(false)} />
        </CheckoutModal>
      )}
    </div>
  );
};

export default NavBar;
