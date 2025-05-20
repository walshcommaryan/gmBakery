import React from 'react';

type BakeryItemProps = {
  itemImage: string;
  sizeClass: string; // pass Tailwind class instead of number
};

const BakeryItem = ({ itemImage, sizeClass }: BakeryItemProps) => {
  return (
    <div className={`relative ${sizeClass}`}>
      <img
        src={itemImage}
        alt='Pastry'
        className='absolute top-1/3 left-1/2 w-[67%] h-3/4 object-contain transform -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  );
};

export default BakeryItem;
