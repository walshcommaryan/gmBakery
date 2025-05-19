import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CheckOutButton from './CheckOutButton';
import AuthModal from './AuthModal';
import { useCart } from '../context/CartContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);
  const { clearCart } = useCart();

  // Function to open modal with "login required" message
  const openLoginModal = (required = false) => {
    setLoginRequired(required);
    setShowModal(true);
  };

  return (
    <div className="flex justify-between p-12">
      <div><p>GM Petit</p></div>
      <div className="flex flex-row gap-8 items-center">
        {user ? (
          <>
            <span>Welcome, {user.first_name}</span>
            <button className="btn-checkout" onClick={() => {
              logout();
              clearCart(false);
            }}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-checkout" onClick={() => openLoginModal(false)}>
            Login
          </button>
        )}
        <CheckOutButton openLoginModal={openLoginModal} />
      </div>
      <AuthModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setLoginRequired(false);
        }}
        loginRequired={loginRequired}
      />
    </div>
  );
};

export default NavBar;
