import React from "react";
import { ProductCardProps } from "./ProductCard";
import CheckOutCard from "./CheckOutCard";
import { useCart } from "../context/CartContext";

interface CheckoutGridProps {
  items: ProductCardProps[];
}

const CheckOutGrid: React.FC<CheckoutGridProps> = ({ items }) => {
  const { getItemQuantity } = useCart();
  return (
    <div className="grid gap-4 px-2 sm:px-4">
      {items
        .filter((item) => getItemQuantity(item.name) > 0)
        .map((item) => (
          <CheckOutCard
            key={item.name}
            name={item.name}
            product_id={item.product_id}
            price={item.price}
            pack_size={item.pack_size}
            itemImage={item.itemImage}
            sizeClass={item.sizeClass}
          />
        ))}
    </div>
  );
};

export default CheckOutGrid;
