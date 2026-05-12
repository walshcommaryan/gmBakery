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
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

interface NavBarProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  loginRequired: boolean;
  setLoginRequired: (required: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  showModal,
  setShowModal,
  loginRequired,
  setLoginRequired,
}) => {
  const { user, logout } = useAuth();
  const { clearCart, getTotalQty } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCheckoutOpen ? "hidden" : "unset";
  }, [isCheckoutOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 bg-pastryWhite ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/assets/images/logo.png"
            alt="GM Petit Cafe"
            className="w-12 sm:w-14 md:w-16 object-contain transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex flex-row items-center gap-1">
          <Link to="/about" className="btn-nav">
            About
          </Link>
          <Link to="/location" className="btn-nav">
            Locations
          </Link>
          {user ? (
            <div className="relative group">
              <span className="btn-nav cursor-pointer">
                {user.first_name}
              </span>
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white/90 backdrop-blur-md shadow-xl ring-1 ring-chocolate/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <Link
                  to="/order-history"
                  className="block px-4 py-3 text-sm text-milkChocolate hover:bg-warmGold/10 hover:text-chocolate transition-colors"
                >
                  Order History
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-sm text-milkChocolate hover:bg-warmGold/10 hover:text-chocolate transition-colors border-t border-chocolate/5"
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
          {user && getTotalQty() > 0 && (
            <CheckOutButton
              openLoginModal={openLoginModal}
              openCheckoutModal={() => setIsCheckoutOpen(true)}
            />
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-pastryWhite/95 backdrop-blur-lg shadow-lg z-20 flex flex-col gap-2 p-6 border-t border-chocolate/5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/about"
              className="btn-nav justify-start"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/location"
              className="btn-nav justify-start"
              onClick={() => setIsOpen(false)}
            >
              Locations
            </Link>
            {user ? (
              <>
                <Link
                  to="/order-history"
                  className="btn-nav justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  Order History
                </Link>
                <button
                  className="btn-nav justify-start"
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
                className="btn-nav justify-start"
                onClick={() => {
                  openLoginModal(false);
                  setIsOpen(false);
                }}
              >
                Login
              </button>
            )}
            {user && getTotalQty() > 0 && (
              <CheckOutButton
                openLoginModal={openLoginModal}
                openCheckoutModal={() => {
                  setIsCheckoutOpen(true);
                  setIsOpen(false);
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Icon */}
      <AnimatePresence>
        {getTotalQty() > 0 && (
          <motion.button
            key="cart-icon"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => {
              if (user) {
                setIsCheckoutOpen(true);
              } else {
                setLoginRequired(true);
                setShowModal(true);
              }
            }}
            className="fixed bottom-6 right-6 z-50 bg-chocolate text-cream p-4 rounded-full shadow-xl shadow-chocolate/30 hover:bg-milkChocolate transition-colors duration-200"
            aria-label="Open cart"
          >
            <div className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -top-3 -right-3 bg-warmGold text-chocolate text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {getTotalQty()}
              </span>
            </div>
          </motion.button>
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
    </nav>
  );
};

export default NavBar;
