import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createCheckout } from "../api/billing";
import { CheckoutOrder } from "../api/types/CheckoutOrder";

export const SquareCheckout = () => {
  const { cart, getTotalPrice, getTotalQty } = useCart();
  const totalQty = getTotalQty();
  const [isLoading, setIsLoading] = useState(false);

  const lineItems: CheckoutOrder[] = Object.values(cart).map((item) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { url } = await createCheckout(lineItems);
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Failed to create checkout session", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg mx-auto text-white bg-pastryYellow p-6">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-2">
        <h1 className="text-black text-xl font-bold text-center">
          Total: ${getTotalPrice().toFixed(2)}
        </h1>
        <p className="text-black text-sm sm:text-base flex-1 mx-auto">
          {totalQty === 0
            ? "Cart is empty"
            : `(${totalQty} item${totalQty === 1 ? "" : "s"} in your cart)`}
        </p>
        <button
          type="submit"
          className="btn-checkout flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Proceed to Checkout"
          )}
        </button>
      </form>
    </div>
  );
};
