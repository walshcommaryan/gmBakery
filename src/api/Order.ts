import api from './index';
import { Order } from './types/Order';

export type NewOrder = Omit<Order, 'order_id'>;

export const getAllOrders = async (customerId?: number): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders', {
    params: {
      customerId,
    },
  });
  return response.data;
};

export const createOrder = async (orderData: NewOrder): Promise<Order> => {
  const response = await api.post<Order>('/order', orderData);
  return response.data;
};

