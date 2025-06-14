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

export const getLatestPaidOrder = async (): Promise<Order | null> => {
  try {
    const res = await api.get<Order>("/orders/latest-paid", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const resetPaymentConfirmation = async (): Promise<void> => {
  try {
    await api.post(
      "/orders/reset-confirmation",
      {},
      {
        withCredentials: true,
      },
    );
  } catch (err) {
    console.error("Failed to reset payment confirmation:", err);
  }
};

export const getOrderHistory = async (): Promise<Order[]> => {
  const res = await api.get("/orders/history", { withCredentials: true });
  return res.data;
};

export const getOrderItems = async (orderId: number) => {
  const res = await api.get(`/orders/${orderId}/items`, {
    withCredentials: true,
  });
  return res.data;
};
