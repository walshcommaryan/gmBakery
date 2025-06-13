import React from "react";
import { ProductCardProps } from "./ProductCard";
import Counter from "./Counter";
import { useCart } from "../context/CartContext";

interface Props extends ProductCardProps {
  readOnly?: boolean;
}

const CheckOutCard: React.FC<Props> = ({
  name,
  price,
  product_id,
  pack_size,
  itemImage,
  readOnly = false,
}) => {
  const { getItemQuantity } = useCart();
  const quantity = getItemQuantity(name);
  const totalUnits = quantity * (pack_size || 1); // fallback to 1 if not passed

  console.log("readOnly?", readOnly);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white shadow-md ring-1 ring-slate-200 rounded-xl p-4">
      {/* Image */}
      <div className="w-24 h-24 sm:w-20 sm:h-20 border-2 border-gray-400 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={`${itemImage}`}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-grow w-full gap-2">
        <div className="flex-grow">
          <h2 className="text-md sm:text-lg font-semibold truncate">{name}</h2>

          {pack_size > 1 && quantity > 0 && (
            <p className="text-sm text-gray-500">
              {quantity} pack(s) ({totalUnits} total)
            </p>
          )}
        </div>

        {/* Conditionally show editable counter or read-only quantity */}
        <div className="flex items-center gap-2 sm:justify-center lg:w-[150px] flex-shrink-0">
          <p className="text-sm">Qty:</p>
          {readOnly ? (
            <p className="text-sm font-medium">{quantity}</p>
          ) : (
            <Counter name={name} price={price} product_id={product_id} />
          )}
        </div>

        {/* Price */}
        <div className="text-right font-bold text-sm sm:text-base w-full sm:w-auto sm:ml-auto">
          ${(quantity * Number(price)).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CheckOutCard;
