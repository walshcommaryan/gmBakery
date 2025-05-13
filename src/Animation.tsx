// src/Animation.tsx
import { motion } from 'framer-motion';

const Animation = () => {
  return (
    <motion.div
      className="p-6 bg-pink-200 rounded-xl shadow-xl text-center text-pink-900 font-semibold text-lg"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      🍰 Freshly Baked Just for You!
    </motion.div>
  );
};

export default Animation;
