import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const CheckoutModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl w-[90%] max-w-4xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        {children}
      </div>
    </div>
  );
};

export default CheckoutModal;
