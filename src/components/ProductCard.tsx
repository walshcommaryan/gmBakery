import React from 'react';
import BakeryItem from './BakeryItem';
import { motion } from 'framer-motion';
import Counter from './Counter';

export type ProductCardProps = {
  name: string;
  price: number;
  itemImage: string;
  plateImage: string;
  sizeClass: string;
};

const ProductCard = ({ name, price, itemImage, plateImage, sizeClass }: ProductCardProps) => {

  return (
      <motion.div
        className='flex flex-col items-center transition'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}

        viewport={{ once: true, amount: 0.2 }}
      >
      {/* Relative container for bakery item and text */}
      <div className='relative'>

        {/* Badge for Counter */}
        <div className='flex justify-end'>
          <Counter name={name} price={price} />
        </div>
        

        {/* Bakery item with sizeClass */}
        <BakeryItem itemImage={itemImage} plateImage={plateImage} sizeClass={sizeClass} />

        {/* Dynamically positioned text */}
        <div
          className='absolute inset-0 flex flex-col items-center justify-between px-2'
          style={{
            top: '75%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            paddingTop: '5%', 
            paddingBottom: '10%', 
            textAlign: 'center', 
          }}
        >
          {/* Name */}
          <h2 className='text-lg md:text-xl font-semibold'>{name}</h2>
          {/* Price */}
          <p className='text-gray-500'>$ {price}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
