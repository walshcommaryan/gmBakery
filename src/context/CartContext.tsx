import React, { createContext, useContext, useState, useEffect } from 'react';
import { updateCartItem, fetchCart, clearItemsInCart, mergeGuestCart } from '../api/Cart';
import { useAuth } from './AuthContext'; // make sure path is correct


type CartItem = {
  name: string;
  price: number;
  quantity: number;
  product_id: number;
};


type CartContextType = {
  cart: Record<string, CartItem>;
  addItem: (name: string, price: number, productId: number) => void;
  removeItem: (name: string, price: number, productId: number) => void;
  getItemQuantity: (name: string) => number;
  getTotalQuantity: () => number;
  clearCart: (db: boolean) => void;
  getTotalPrice: () => number;
  getTotalQty: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const { user } = useAuth();
    
    // Restore cart on load
    useEffect(() => {
  const syncCartAfterLogin = async () => {
    if (!user) return;

    // 1. Convert guest cart to API format
    const guestCartItems = Object.entries(cart).map(([_, item]) => ({
      product_id: item.product_id, // you'll need to store this in CartItem
      quantity: item.quantity,
    }));

    try {
      if (guestCartItems.length > 0) {
        // 2. Send guest cart to backend for merging
        await mergeGuestCart(guestCartItems);
      }

      // 3. Fetch final backend cart
      const response = await fetchCart();
      const backendCart = response.items || [];

      const formattedCart: Record<string, CartItem> = {};
      backendCart.forEach((item: any) => {
        formattedCart[item.name] = {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.product_id, // ensure you store this
        };
      });

      setCart(formattedCart);
      
    } catch (error) {
      console.error('Failed to sync cart after login', error);
    }
  };

  syncCartAfterLogin();
}, [user]);




    const addItem = async (name: string, price: number, product_id: number) => {
      // Determine current quantity
      const currentQuantity = cart[name]?.quantity ?? 0;
      const newQuantity = currentQuantity + 1;

      try {
        // Call backend API to update quantity
        if (user) {
          await updateCartItem({ product_id: product_id, quantity: newQuantity });
        }
        
        // Update local state only after success
        setCart((prev) => ({
          ...prev,
          [name]: {
            name,
            price,
            quantity: newQuantity,
            product_id,
          },
        }));

      } catch (error) {
        console.error('Failed to update cart item:', error);
      }
    };

    const removeItem = async (name: string, price: number, product_id: number) => {
      const currentQuantity = cart[name]?.quantity ?? 0;
      const newQuantity = currentQuantity - 1;

      if (newQuantity < 0) return; // guard against negative quantities

      try {
        if (user) {
          await updateCartItem({ product_id: product_id, quantity: newQuantity });
        }

        setCart((prev) => {
          const updatedCart = { ...prev };
          if (newQuantity === 0) {
            delete updatedCart[name];
          } else {
            updatedCart[name] = {
              name,
              price,
              quantity: newQuantity,
              product_id,
            };
          }
          return updatedCart;
        });

      } catch (error) {
        console.error('Failed to update cart item:', error);
      }
    };


    const getItemQuantity = (name: string) => {
        return cart[name]?.quantity || 0;
    };

    const getTotalQuantity = () => {
        return Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    };

    const getTotalPrice = () => {
      return Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    };


    const getTotalQty = () => {
      let totalQty = 0;
      Object.values(cart).forEach((item) => {
        totalQty += item.quantity;
      });
      return totalQty;
    }

    const clearCart = (db: boolean) => {
      if (db) {
        clearItemsInCart();
      }
      setCart({});
    }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, getItemQuantity, getTotalQuantity, getTotalPrice, getTotalQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
