import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const CheckoutModal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-chocolate/30 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-cream rounded-2xl w-[90%] max-w-4xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default CheckoutModal;
