import React from 'react';

type BakeryItemProps = {
  itemImage: string;
  plateImage: string;
  sizeClass: string; // pass Tailwind class instead of number
};

const BakeryItem = ({ itemImage, plateImage, sizeClass }: BakeryItemProps) => {
  return (
    <div className={`relative ${sizeClass}`}>
      <img src={plateImage} alt='Plate' className='w-full h-full object-contain drop-shadow-2xl' />
      <img
        src={itemImage}
        alt='Pastry'
        className='absolute top-1/4 left-1/2 w-1/2 h-1/2 object-contain transform -translate-x-1/2 -translate-y-1/2'
      />
    </div>
  );
};

export default BakeryItem;
