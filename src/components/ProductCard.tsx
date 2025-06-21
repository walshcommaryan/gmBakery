import React, { useState } from "react";
import BakeryItem from "./BakeryItem";
import { motion, AnimatePresence } from "framer-motion";

export type ProductCardProps = {
  name: string;
  price: number;
  product_id: number;
  pack_size: number;
  quantity: number;
  description: string;
  images: string[];
  sizeClass: string;
};

const ProductCard = ({
  name,
  price,
  product_id,
  pack_size,
  quantity,
  description,
  images,
  sizeClass,
}: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  // Carousel controls
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((idx) => (idx + 1) % images.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((idx) => (idx - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Your existing card */}
      <div
        className="relative min-w-0 w-full max-w-xs mx-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <motion.div
          className="flex flex-col items-center transition p-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.1 },
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative w-full flex items-center justify-center">
            {/* Gray overlay and "View Description" on hover */}
            <BakeryItem images={images} sizeClass={sizeClass} />
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-xs sm:text-sm md:text-base font-semibold bg-black/30 px-2 py-1 sm:px-3 sm:py-1.5 rounded text-white font-seasons -translate-y-[100%]">
                    View Description
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            <div
              className="absolute inset-0 flex flex-col items-center justify-between px-2"
              style={{
                top: "75%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                paddingTop: "5%",
                paddingBottom: "10%",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <h2 className="text-lg md:text-xl font-semibold break-words w-full">
                {name}
              </h2>
              <p className="text-gray-500 w-full break-words">$ {price}</p>
              {pack_size > 1 && (
                <p className="text-xs text-gray-400 mt-1 w-full break-words">
                  Pack of {pack_size}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full flex flex-col lg:flex-row overflow-hidden relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Carousel */}
              <div className="relative w-full lg:w-1/2 flex items-center justify-center bg-white">
                <img
                  src={images[imgIdx]}
                  alt={name}
                  className="object-contain w-full h-64 rounded-lg pointer-events-none"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 w-full flex justify-center gap-4 z-10">
                    <button
                      className="bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow transition pointer-events-auto"
                      onClick={prevImg}
                      aria-label="Previous image"
                      type="button"
                    >
                      <span className="text-xl font-bold text-gray-700">&#8592;</span>
                    </button>
                    <button
                      className="bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow transition pointer-events-auto"
                      onClick={nextImg}
                      aria-label="Next image"
                      type="button"
                    >
                      <span className="text-xl font-bold text-gray-700">&#8594;</span>
                    </button>
                  </div>
                )}
              </div>
              {/* Details */}
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
                <p className="text-gray-500 mb-2 text-lg">${price}</p>
                {pack_size > 1 && (
                  <p className="text-xs text-gray-400 mb-2">Pack of {pack_size}</p>
                )}
                <p className="mb-4">{description}</p>
                <div className="flex justify-end mt-auto">
                  <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
