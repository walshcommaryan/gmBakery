import React, { useState, useEffect } from "react";
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

  // Prevent background scroll when checkout modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCheckoutOpen]);

  const openLoginModal = (required = false) => {
    setLoginRequired(required);
    setShowModal(true);
  };

  return (
    <div className="flex justify-between p-4">
      {/* Logo */}
      <div>
        <img
          src={"/assets/images/logo.png"}
          alt="Pastry"
          className="w-12 sm:w-16 md:w-24 object-contain"
        />
      </div>

      {/* Right section */}
      <div className="flex gap-8 items-center mx-2 sm:mx-10">
        {user ? (
          <>
            <span>Welcome, {user.first_name}</span>
            <button
              className="btn-checkout"
              onClick={() => {
                logout();
                clearCart(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="btn-checkout"
            onClick={() => openLoginModal(false)}
          >
            Login
          </button>
        )}

        <CheckOutButton
          openLoginModal={openLoginModal}
          openCheckoutModal={() => setIsCheckoutOpen(true)}
        />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setLoginRequired(false);
        }}
        loginRequired={loginRequired}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)}>
          <CheckoutPage onClose={() => setIsCheckoutOpen(false)} />
        </CheckoutModal>
      )}
    </div>
  );
};

export default NavBar;
