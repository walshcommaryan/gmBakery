import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAnimate } from "framer-motion";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";

interface CounterProps {
  name: string;
  price: number;
  product_id: number;
}

const Counter: React.FC<CounterProps> = ({ name, price, product_id }) => {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(name);
  const [hasMounted, setHasMounted] = useState(false);

  const [plusScope, animatePlus] = useAnimate();
  const [minusScope, animateMinus] = useAnimate();

  useEffect(() => setHasMounted(true), []);

  const handleAdd = () => {
    addItem(name, price, product_id);
    animatePlus(plusScope.current, { scale: [1, 1.2, 1] }, { duration: 0.2 });
  };

  const handleRemove = () => {
    removeItem(name, price, product_id);
    animateMinus(minusScope.current, { scale: [1, 1.2, 1] }, { duration: 0.2 });
  };

  if (!hasMounted) return null;

  return (
    <div>
      {quantity > 0 ? (
        <div className="flex items-center gap-0 bg-cream/90 backdrop-blur-sm rounded-full shadow-md px-1 py-0.5 border border-chocolate/5">
          <button
            onClick={handleRemove}
            ref={minusScope}
            className="w-6 h-6 flex items-center justify-center bg-pastryWhite hover:bg-softRose text-chocolate rounded-full transition-colors"
          >
            {quantity === 1 ? (
              <TrashIcon className="w-3 h-3 text-red-400" />
            ) : (
              <MinusIcon className="w-3 h-3" />
            )}
          </button>

          <span className="text-sm text-center w-6 font-medium text-chocolate">
            {quantity}
          </span>

          <button
            onClick={handleAdd}
            ref={plusScope}
            className="w-6 h-6 flex items-center justify-center bg-pastryWhite hover:bg-warmGold/20 text-chocolate rounded-full transition-colors"
          >
            <PlusIcon className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => addItem(name, price, product_id)}
          ref={plusScope}
          className="w-7 h-7 flex items-center justify-center bg-cream/90 backdrop-blur-sm hover:bg-warmGold/20 text-chocolate rounded-full shadow-md border border-chocolate/5 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Counter;
