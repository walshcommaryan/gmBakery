import React from "react";
import { ProductCardProps } from "./ProductCard";
import CheckOutCard from "./CheckOutCard";
import { useCart } from "../context/CartContext";
import { imageMap } from "../data/ProductsHelper";

interface CheckoutGridProps {
  items: ProductCardProps[];
  readOnly?: boolean;
}

const CheckOutGrid: React.FC<CheckoutGridProps> = ({ items, readOnly }) => {
  const { getItemQuantity } = useCart();

  const visibleItems = readOnly
    ? items // don't filter if read-only
    : items.filter((item) => getItemQuantity(item.name) > 0);

  return (
    <div className="grid gap-4 px-2 sm:px-4">
      {visibleItems.map((item) => {
        const itemImage =
          imageMap[item.name] || "/assets/images/placeholder.png";

        return (
          <CheckOutCard
            key={item.product_id}
            readOnly={readOnly}
            {...item}
            itemImage={itemImage}
          />
        );
      })}
    </div>
  );
};

export default CheckOutGrid;
