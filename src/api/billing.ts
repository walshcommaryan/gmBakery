import api from "./index";
import { CheckoutOrder } from "./types/CheckoutOrder";

export const createCheckout = async (lineItems: CheckoutOrder[]) => {
  const { data } = await api.post("/billing/create-checkout-session", {
    items: lineItems,
  });
  return data;
};
