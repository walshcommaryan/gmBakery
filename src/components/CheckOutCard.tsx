import React from 'react'
import { ProductCardProps } from './ProductCard';
import Counter from './Counter';
import { useCart } from './CartContext'

const CheckOutCard = ({ name, price, itemImage, plateImage, sizeClass}: ProductCardProps) => {
    const { getItemQuantity } = useCart();
    return (
        <div className="card lg:card-side bg-white shadow-lg ring-1 ring-slate-200">
            <div className="w-24 h-24 border-2 border-gray-500 rounded-xl overflow-hidden flex-shrink-0 my-auto ms-2">
                <img
                src={`${itemImage}`}
                alt={`${name}`} 
                className='object-cover'
                />
            </div>
            <div className="card-body grid grid-cols-1 lg:grid-cols-[1fr_130px_80px] items-center gap-4 sm:gap-6 min-h-28">
                {/* Name */}
                <div className="card-title overflow-hidden text-ellipsis">{name}</div>

                {/* Qty */}
                <div className="flex items-center gap-2 justify-start">
                    <p>Qty:</p>
                    <Counter name={name} price={price} />
                </div>

                {/* Price */}
                <div className="card-title truncate min-w-0 text-right shrink-0 max-w-[100px]">
                    {`$${(getItemQuantity(name) * Number(price)).toFixed(2)}`}
                </div>
            </div>
        </div>
    )
}

export default CheckOutCard;