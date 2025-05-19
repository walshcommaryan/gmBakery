import React from 'react'
import { ProductCardProps } from './ProductCard';
import Counter from './Counter';
import { useCart } from '../context/CartContext'

const CheckOutCard = ({ name, price, product_id, itemImage }: ProductCardProps) => {
  const { getItemQuantity } = useCart();

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

      {/* Content container flex-grow to take available space */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-grow w-full gap-2">
        {/* Name */}
        <h2 className="text-md sm:text-lg font-semibold truncate flex-grow">
          {name}
        </h2>

        {/* Qty / Counter */}
        <div className="flex items-center gap-2 sm:justify-center lg:w-[150px] flex-shrink-0">
          <p className="text-sm">Qty:</p>
          <Counter name={name} price={price} product_id={product_id} />
        </div>

        {/* Price */}
        <div className="text-right font-bold text-sm sm:text-base w-full sm:w-auto sm:ml-auto">
          ${ (getItemQuantity(name) * Number(price)).toFixed(2) }
        </div>
      </div>
    </div>
  );
};

export default CheckOutCard;
