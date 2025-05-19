import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAnimate } from 'framer-motion';

interface CounterProps {
  name: string;
  price: number;
  product_id: number;
}

const Counter: React.FC<CounterProps> = ({ name, price, product_id }) => {
    const { addItem, removeItem, getItemQuantity } = useCart();
    const quantity = getItemQuantity(name);
    const [hasMounted, setHasMounted] = useState(false);

    // Adding Animation + Adding Item
    const handleAdd = (name: string) => {
      addItem(name, price, product_id);
      animatePlus(plusScope.current, { scale: [1, 1.2, 1] }, { duration: 0.3, ease: 'easeInOut' });
    };

    // Subtracting Animation + Removing Item
    const handleRemove = (name: string) => {
      removeItem(name, price, product_id);
      animateMinus(minusScope.current, { scale: [1, 1.2, 1] }, { duration: 0.3, ease: 'easeInOut' });
    };

    const [plusScope, animatePlus] = useAnimate();
    const [minusScope, animateMinus] = useAnimate();

    // Framer Motion Opacity Render Fix
    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <div>
        {/* Badge */}
        {quantity > 0 ? (
          <div className='flex flex-row'>
            <button onClick={() => handleRemove(name)}
              ref={minusScope}
              className=" bg-gray-200 text-black text-xl rounded-l-full w-6 h-6 flex items-center justify-center"
            >
              {"-"}
            </button>
            
            <p
              className="top-7 -right-0  bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center"
            >
              {quantity}
            </p>

            <button onClick={() => handleAdd(name)}
              ref={plusScope}
              className="top-7 -right-6 bg-gray-200 text-black text-xl rounded-r-full w-6 h-6 flex items-center justify-center"
            >
              {"+"}
            </button>
          </div>
        ): (
          <div>
            <button onClick={() => addItem(name, price, product_id)}
              className="top-7 right-0 bg-gray-200 text-black text-xl rounded-full w-6 h-6 flex items-center justify-center"
            >
              {"+"}
            </button>
          </div>
        )
        }
        </div>
    )
}

export default Counter