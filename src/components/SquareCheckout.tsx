import React from "react";
import { useCart } from "../context/CartContext";
import { createCheckout } from "../api/billing";
import { CheckoutOrder } from "../api/types/CheckoutOrder";

export const SquareCheckout = () => {
  const { cart, getTotalPrice, getTotalQty } = useCart();
  const totalQty = getTotalQty();

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
        window.location.href = url;
      }
    } catch (err) {
      console.error("Failed to create checkout session", err);
    }
  };

  return (
    <div className="w-full rounded-lg mx-auto text-white bg-pastryYellow p-6">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-2">
        <h1 className="text-black text-xl font-bold text-center">
          Total: $ {getTotalPrice().toFixed(2)}
        </h1>
        <p className="text-black text-sm sm:text-base flex-1 mx-auto">
          {totalQty === 0
            ? " Cart is empty"
            : `(${totalQty} item${totalQty === 1 ? "" : "s"} in your cart)`}
        </p>
        <button
          type="submit"
          className="w-full rounded-md text-black font-bold bg-pastryWhite p-3 shadow-md shadow-gray-400"
        >
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};
