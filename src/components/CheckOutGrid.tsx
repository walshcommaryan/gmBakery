import React from 'react'
import { ProductCardProps } from './ProductCard';
import CheckOutCard from './CheckOutCard';
import { useCart } from './CartContext'

interface CheckoutGridProps {
  items: ProductCardProps[]; // This defines items as an array of ProductCardProps
}

const CheckOutGrid: React.FC<CheckoutGridProps> = ({ items }) => {
    const { getItemQuantity } = useCart();
    return (
        <div>
            {items
            .filter((item) => getItemQuantity(item.name) > 0)
            .map((item) => (
                <CheckOutCard
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    itemImage={item.itemImage}
                    plateImage={item.plateImage}
                    sizeClass={item.sizeClass}
                />
            ))}
        </div>
    )
}

export default CheckOutGrid;