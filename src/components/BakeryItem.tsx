import React from 'react';

type BakeryItemProps = {
  itemImage: string;
  plateImage: string;
  sizeClass: string; // pass Tailwind class instead of number
};

const BakeryItem = ({ itemImage, plateImage, sizeClass }: BakeryItemProps) => {
  return (
    <div className={`relative ${sizeClass}`}>
      <img
        src={itemImage}
        alt='Pastry'
        className='absolute top-1/3 left-1/2 w-1/2 h-3/4 object-contain transform -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  );
};

export default BakeryItem;
