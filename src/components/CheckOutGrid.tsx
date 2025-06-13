import React from "react";
import { ProductCardProps } from "./ProductCard";
import CheckOutCard from "./CheckOutCard";
import { useCart } from "../context/CartContext";

interface CheckoutGridProps {
  items: ProductCardProps[];
  readOnly?: boolean;
}

const CheckOutGrid: React.FC<CheckoutGridProps> = ({ items, readOnly }) => {
  const { getItemQuantity } = useCart();

  return (
    <div className="grid gap-4 px-2 sm:px-4">
      {items
        .filter((item) => getItemQuantity(item.name) > 0)
        .map((item) => (
          <CheckOutCard key={item.name} readOnly={readOnly} {...item} />
        ))}
    </div>
  );
};

export default CheckOutGrid;
