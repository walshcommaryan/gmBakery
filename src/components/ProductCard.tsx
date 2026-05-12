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
      <div
        className="relative min-w-0 w-full max-w-xs mx-auto cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        <motion.div
          className="flex flex-col items-center p-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full flex items-center justify-center">
            <BakeryItem images={images} sizeClass={sizeClass} />
            <AnimatePresence>
              {hovered && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-xs sm:text-sm font-medium bg-chocolate/70 backdrop-blur-sm px-4 py-2 rounded-full text-cream font-bakery tracking-wide -translate-y-[100%]">
                    View Details
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
              <h2 className="text-base md:text-lg font-medium break-words w-full text-chocolate">
                {name}
              </h2>
              <p className="text-milkChocolate w-full break-words text-sm">${price}</p>
              {pack_size > 1 && (
                <p className="text-xs text-whiteChocolate mt-0.5 w-full break-words">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-chocolate/40 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-cream rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col lg:flex-row overflow-hidden relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Carousel */}
              <div className="relative w-full lg:w-1/2 flex items-center justify-center bg-pastryWhite">
                <img
                  src={images[imgIdx]}
                  alt={name}
                  className="object-contain w-full h-64 lg:h-80 pointer-events-none p-4"
                />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 z-10">
                    <button
                      className="bg-cream/90 backdrop-blur-sm hover:bg-cream border border-chocolate/10 rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition pointer-events-auto"
                      onClick={prevImg}
                      aria-label="Previous image"
                      type="button"
                    >
                      <span className="text-sm text-chocolate">&larr;</span>
                    </button>
                    <button
                      className="bg-cream/90 backdrop-blur-sm hover:bg-cream border border-chocolate/10 rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition pointer-events-auto"
                      onClick={nextImg}
                      aria-label="Next image"
                      type="button"
                    >
                      <span className="text-sm text-chocolate">&rarr;</span>
                    </button>
                  </div>
                )}
              </div>
              {/* Details */}
              <div className="flex-1 flex flex-col p-8 overflow-y-auto">
                <h2 className="text-2xl font-seasons text-chocolate mb-1">{name}</h2>
                <p className="text-warmGold font-medium text-lg mb-1">${price}</p>
                {pack_size > 1 && (
                  <p className="text-xs text-whiteChocolate mb-3">Pack of {pack_size}</p>
                )}
                <div className="w-8 h-[1px] bg-warmGold/40 mb-4" />
                <p className="text-milkChocolate text-sm leading-relaxed mb-6">{description}</p>
                <div className="flex justify-end mt-auto">
                  <button
                    className="btn-primary text-xs"
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
