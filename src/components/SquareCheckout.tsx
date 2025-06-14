import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createCheckout } from "../api/billing";
import { CheckoutOrder } from "../api/types/CheckoutOrder";
import { format } from "date-fns";
import { PickupDateSelector } from "./PickupDateSelector";
import { PickupLocationSelector } from "./PickupLocationSelector";

export const SquareCheckout = () => {
  const { cart, getTotalPrice, getTotalQty } = useCart();
  const totalQty = getTotalQty();
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Date | undefined>();

  const lineItems: CheckoutOrder[] = Object.values(cart).map((item) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupLocation || !pickupDate) return;
    setIsLoading(true);

    try {
      const formattedDate = format(pickupDate, "yyyy-MM-dd");
      const { url } = await createCheckout(
        lineItems,
        pickupLocation,
        formattedDate,
      );
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Failed to create checkout session", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg text-black bg-pastryYellow p-6">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-4">
        <h1 className="text-black text-xl font-bold text-center">
          Total: ${getTotalPrice().toFixed(2)}
        </h1>

        <p className="text-black text-xs sm:text-sm text-center mb-36">
          {totalQty === 0
            ? "Cart is empty"
            : `(${totalQty} item${totalQty === 1 ? "" : "s"})`}
        </p>

        {/* Date Picker */}
        <PickupDateSelector value={pickupDate} onChange={setPickupDate} />

        {/* Location Dropdown */}
        <PickupLocationSelector
          value={pickupLocation}
          onChange={setPickupLocation}
        />

        {/* Checkout Button */}
        <button
          type="submit"
          className="btn relative flex items-center justify-center px-10 text-lg min-h-[60px] disabled:opacity-70 mx-auto"
          disabled={isLoading || !pickupLocation || !pickupDate}
        >
          <span className={isLoading ? "invisible" : ""}>
            Proceed to Checkout
          </span>
          {isLoading && (
            <span className="absolute">
              <span className="loading loading-spinner loading-md text-black"></span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};
