import React from "react";
import { useCart } from "../context/CartContext";
import { createCheckout } from "../api/billing";
import { CheckoutOrder } from "../api/types/CheckoutOrder";

export const SquareCheckout = () => {
  const { cart, getTotalPrice } = useCart();

  const lineItems: CheckoutOrder[] = Object.values(cart).map((item) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { url } = await createCheckout(lineItems);
      if (url) {
        window.location.href = url; // Redirect to Square hosted checkout
      }
    } catch (err) {
      console.error("Failed to create checkout session", err);
    }
  };

  return (
    <div className="w-full lg:w-1/3 h-auto rounded-lg mx-auto text-white bg-gray-800 p-6">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold text-center">
          $ {getTotalPrice().toFixed(2)}
        </h1>
        <button
          type="submit"
          className="w-full rounded-md bg-cyan-500 p-3 shadow-lg shadow-cyan-500/50 text-white"
        >
          Checkout with Square
        </button>
      </form>
    </div>
  );
};
