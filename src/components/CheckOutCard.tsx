import React from "react";
import { ProductCardProps } from "./ProductCard";
import Counter from "./Counter";
import { useCart } from "../context/CartContext";

interface Props extends ProductCardProps {
  readOnly?: boolean;
  images: string[];
}

const CheckOutCard: React.FC<Props> = ({
  name,
  price,
  product_id,
  pack_size,
  images,
  quantity,
  readOnly = false,
}) => {
  const { getItemQuantity } = useCart();
  const finalQuantity = readOnly ? quantity : getItemQuantity(name);
  const totalUnits = finalQuantity * (pack_size || 1);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-cream/60 border border-chocolate/5 rounded-xl p-4 transition-all duration-200 hover:border-chocolate/10">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-pastryWhite">
        <img
          src={images[0] || "/assets/images/placeholder.png"}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-grow w-full gap-2">
        <div className="flex-grow">
          <h2 className="text-sm sm:text-base font-medium truncate text-chocolate">
            {name}
          </h2>

          {pack_size > 1 && finalQuantity > 0 && (
            <p className="text-xs text-whiteChocolate">
              {finalQuantity} pack(s) ({totalUnits} total)
            </p>
          )}
        </div>

        {/* Quantity Section */}
        <div className="flex items-center gap-2 sm:justify-center lg:w-[150px] flex-shrink-0">
          <p className="text-xs text-whiteChocolate">Qty:</p>
          {readOnly ? (
            <p className="text-sm font-medium text-chocolate">{finalQuantity}</p>
          ) : (
            <Counter name={name} price={price} product_id={product_id} />
          )}
        </div>

        {/* Price */}
        <div className="text-right font-medium text-sm text-warmGold w-full sm:w-auto sm:ml-auto">
          ${(finalQuantity * Number(price)).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CheckOutCard;
