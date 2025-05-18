import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CheckOutButton from './CheckOutButton';
import AuthModal from './AuthModal'; // ✅ import modal

const NavBar = () => {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex justify-between p-12">
      <div><p>GM Petit</p></div>
      <div className="flex flex-row gap-8 items-center">
        {user ? (
          <>
            <span>Welcome, {user.firstName}</span>
            <button className="btn-checkout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-checkout" onClick={() => setShowModal(true)}>
            Login
          </button>
        )}
        <CheckOutButton />
      </div>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default NavBar;
