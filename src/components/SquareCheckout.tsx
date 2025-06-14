import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createCheckout } from "../api/billing";
import { CheckoutOrder } from "../api/types/CheckoutOrder";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const SquareCheckout = () => {
  const { cart, getTotalPrice, getTotalQty } = useCart();
  const totalQty = getTotalQty();
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");

  const lineItems: CheckoutOrder[] = Object.values(cart).map((item) => ({
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupLocation) return;
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
    <div className="w-full max-w-xl mx-auto rounded-lg text-black bg-pastryYellow p-6">
      <form onSubmit={handleCheckout} className="grid grid-cols-1 gap-2">
        <h1 className="text-black text-xl font-bold text-center">
          Total: ${getTotalPrice().toFixed(2)}
        </h1>

        <p className="text-black text-xs sm:text-[14px] text-center mx-auto lg:mb-56">
          {totalQty === 0
            ? "Cart is empty"
            : `(${totalQty} item${totalQty === 1 ? "" : "s"} in your cart)`}
        </p>

        {/* Headless UI Dropdown */}
        <div className="w-full">
          <label className="flex justify-center text-xs font-semibold text-gray-700 mb-1">
            Choose Pickup Location <span className="text-red-500">*</span>
          </label>

          <Menu as="div" className="relative text-left flex justify-center">
            <div>
              <MenuButton className="inline-flex w-full justify-center items-center rounded-md bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {pickupLocation || "Select Location"}
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() =>
                        setPickupLocation("Wolf Ranch Farmers Market")
                      }
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Wolf Ranch Farmers Market
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>

        <button
          type="submit"
          className="btn relative flex items-center justify-center px-10 text-lg min-h-[60px] disabled:opacity-70 mx-auto"
          disabled={isLoading || !pickupLocation}
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
