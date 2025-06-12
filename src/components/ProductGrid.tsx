import React from "react";
import ProductCard from "./ProductCard";
import { ProductCardProps } from "./ProductCard";
import Counter from "./Counter";

type ProductGridProps = {
  items: ProductCardProps[];
  columns: number;
};

const ProductGrid = ({ items, columns }: ProductGridProps) => {
  const getColsClass = (prefix: string, count: number) => {
    return `${prefix}:grid-cols-${count}`;
  };
  return (
    <div className="container mx-auto px-4 -mt-8">
      <div
        className={`grid gap-6
          grid-cols-1
          ${getColsClass("sm", columns)}
          ${getColsClass("md", columns)}
          ${getColsClass("lg", columns)}
          ${getColsClass("xl", columns)}
        `}
      >
        {items.map((item) => {
          return (
            <div className="relative">
              <div className="absolute -top-2 right-36 sm:top-0 sm:-right-6 md:top-0 -md:right-0 lg:top-0 lg:right-2 xl:top-0 xl:right-12 z-30">
                <Counter
                  name={item.name}
                  price={item.price}
                  product_id={item.product_id}
                />
              </div>
              <div className="z-20">
                <ProductCard
                  name={item.name}
                  product_id={item.product_id}
                  price={item.price}
                  pack_size={item.pack_size}
                  itemImage={item.itemImage}
                  sizeClass={item.sizeClass}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
