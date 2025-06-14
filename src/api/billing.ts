import api from "./index";
import { CheckoutOrder } from "./types/CheckoutOrder";

export const createCheckout = async (
  lineItems: CheckoutOrder[],
  location: string,
  pickup_date: string,
) => {
  console.log("📦 Sending checkout body to BE:", location, pickup_date);
  const { data } = await api.post("/billing/create-checkout-session", {
    items: lineItems,
    location,
    pickup_date,
  });
  return data;
};
