import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CheckOutButton from "./CheckOutButton";
import AuthModal from "./AuthModal";
import CheckoutModal from "./CheckoutModal";
import CheckoutPage from "../pages/CheckoutPage";

const NavBar = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  return (
    <div className="flex justify-between p-4 items-center">
      {/* Logo */}
      <div>
        <img
          src={"/assets/images/logo.png"}
          alt="Pastry"
          className="w-12 sm:w-16 md:w-24 object-contain"
        />
      </div>

      {/* Right section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mx-2 sm:mx-10">
        {/* Navigation */}
        <Link
          to="/about"
          className="btn-nav flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 transition"
        >
          About
        </Link>

        <div className="flex gap-4">
          <Link
            to="/location"
            className="btn-nav text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Locations
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative group">
              <span className="text-sm btn-nav font-medium text-gray-700 cursor-pointer hover:text-gray-900">
                Welcome, {user.first_name}
              </span>
              <div className="absolute left-0 mt-1 w-28 rounded-md bg-white shadow-lg ring-1 ring-gray-200 opacity-0 group-hover:opacity-100 transition duration-150 z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              className="text-sm btn-nav font-medium text-gray-700 hover:text-gray-900 transition"
              onClick={() => openLoginModal(false)}
            >
              Login
            </button>
          )}

          {/* Checkout Button */}
          <div className="ml-4">
            <CheckOutButton
              openLoginModal={openLoginModal}
              openCheckoutModal={() => setIsCheckoutOpen(true)}
            />
          </div>
        </div>
      </div>

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
