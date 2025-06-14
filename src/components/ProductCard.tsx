import React from "react";
import BakeryItem from "./BakeryItem";
import { motion } from "framer-motion";

export type ProductCardProps = {
  name: string;
  price: number;
  product_id: number;
  pack_size: number;
  quantity: number;
  itemImage: string;
  sizeClass: string;
};

const ProductCard = ({
  name,
  price,
  product_id,
  pack_size,
  itemImage,
  sizeClass,
}: ProductCardProps) => {
  return (
    <div className="relative">
      <motion.div
        className="flex flex-col items-center transition"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.1 },
        }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative">
          <BakeryItem itemImage={itemImage} sizeClass={sizeClass} />

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
            }}
          >
            <h2 className="text-lg md:text-xl font-semibold">{name}</h2>
            <p className="text-gray-500">$ {price}</p>

            {pack_size > 1 && (
              <p className="text-xs text-gray-400 mt-1">Pack of {pack_size}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
