import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = {
  name: string;
  quantity: number;
};

type CartContextType = {
  cart: Record<string, CartItem>;
  addItem: (name: string) => void;
  removeItem: (name: string) => void;
  getItemQuantity: (name: string) => number;
  getTotalQuantity: () => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
    
    // Restore cart on load
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const addItem = (name: string) => {
        setCart((prev) => ({
        ...prev,
        [name]: {
            name,
            quantity: (prev[name]?.quantity ?? 0) + 1,
        },
        }));
    };

    const removeItem = (name: string) => {
      setCart((prev) => {
      const updatedCart = { ...prev };

      if (updatedCart[name]) {
        updatedCart[name] = {
          ...updatedCart[name],
          quantity: updatedCart[name].quantity - 1,
        };

        // Optional: remove item completely if quantity <= 0
        if (updatedCart[name].quantity <= 0) {
          delete updatedCart[name];
        }
      }

        return updatedCart;
      });
    };


    const getItemQuantity = (name: string) => {
        return cart[name]?.quantity || 0;
    };

    const getTotalQuantity = () => {
        return Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    };

    const clearCart = () => {
        setCart({});
    }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, getItemQuantity, getTotalQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
