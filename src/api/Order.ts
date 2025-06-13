import api from "./index";
import { Order } from "./types/Order";

export type NewOrder = Omit<Order, "order_id">;

export const getAllOrders = async (customerId?: number): Promise<Order[]> => {
  const response = await api.get<Order[]>("/orders", {
    params: {
      customerId,
    },
  });
  return response.data;
};

export const createOrder = async (orderData: NewOrder): Promise<Order> => {
  const response = await api.post<Order>("/orders", orderData);
  return response.data;
};

export const checkPaymentStatus = async (): Promise<boolean> => {
  try {
    const res = await api.get("/orders/check-payment", {
      withCredentials: true,
    });
    return res.data.ok === true;
  } catch (err) {
    return false;
  }
};
