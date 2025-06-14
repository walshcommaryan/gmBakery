export const ORDER_STATUSES = [
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface Order {
  order_id: number;
  customer_id: number;
  order_date: string;
  status: OrderStatus;
  total_amount: number;
  location: string;
  pickup_date: string;
}
