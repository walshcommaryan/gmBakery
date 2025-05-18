import React from 'react';
import ProductCard from './ProductCard';
import { ProductCardProps } from './ProductCard';

type ProductGridProps = {
  items: ProductCardProps[];
  columns: number
};

const ProductGrid = ({ items, columns}: ProductGridProps) => {

  // Map numbers to classNames explicitly
  const getColsClass = (prefix: string, count: number) => {
    return `${prefix}:grid-cols-${count}`;
  };
  return (
    <div className='container mx-auto px-4 -mt-8'>
      <div
        className={`grid gap-6
          grid-cols-1
          ${getColsClass('sm', columns)}
          ${getColsClass('md', columns)}
          ${getColsClass('lg', columns)}
          ${getColsClass('xl', columns)}
        `}
      >
        {items.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            price={item.price}
            itemImage={item.itemImage}
            plateImage={item.plateImage}
            sizeClass={item.sizeClass}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
