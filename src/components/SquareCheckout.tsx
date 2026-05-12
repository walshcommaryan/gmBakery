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
  const [showErrors, setShowErrors] = useState(false);

  const lineItems: CheckoutOrder[] = Object.values(cart).map((item) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickupLocation || !pickupDate) {
      setShowErrors(true);
      return;
    }

    setIsLoading(true);
    try {
      const formattedDate = format(pickupDate!, "yyyy-MM-dd");
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

  const handlePickupDateChange = (date: Date) => {
    setPickupDate(date);
    if (date && pickupLocation) setShowErrors(false);
  };

  const handleLocationChange = (location: string) => {
    setPickupLocation(location);
    if (pickupDate && location) setShowErrors(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl text-chocolate bg-pastryWhite/50 p-6 border border-chocolate/5">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-5">
        <div className="text-center pb-4 border-b border-chocolate/5">
          <p className="text-xs tracking-[0.2em] uppercase text-whiteChocolate mb-1">
            Order Total
          </p>
          <h1 className="text-3xl font-bakery font-medium text-chocolate">
            ${getTotalPrice().toFixed(2)}
          </h1>
          <p className="text-xs text-whiteChocolate mt-1">
            {totalQty === 0
              ? "Cart is empty"
              : `${totalQty} item${totalQty === 1 ? "" : "s"}`}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <PickupDateSelector
            value={pickupDate}
            onChange={handlePickupDateChange}
            error={showErrors && !pickupDate}
          />

          <PickupLocationSelector
            value={pickupLocation}
            onChange={handleLocationChange}
            error={showErrors && !pickupLocation}
          />
        </div>

        <button
          type="submit"
          className="btn-primary relative flex items-center justify-center min-h-[52px] w-full mt-2"
        >
          <span className={isLoading ? "invisible" : ""}>
            Proceed to Checkout
          </span>
          {isLoading && (
            <span className="absolute">
              <span className="loading loading-spinner loading-md text-cream"></span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
};
