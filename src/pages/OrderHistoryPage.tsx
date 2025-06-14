import React, { useEffect, useState } from "react";
import { getOrderHistory, getOrderItems } from "../api/Order";
import { Order } from "../api/types/Order";
import { ProductCardProps } from "../components/ProductCard";
import CheckOutGrid from "../components/CheckOutGrid";
import { useNavigate } from "react-router-dom";

interface OrderWithItems extends Order {
  items: ProductCardProps[];
}

const ORDERS_PER_PAGE = 5;

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const paginatedOrders = orders.slice(
    (page - 1) * ORDERS_PER_PAGE,
    page * ORDERS_PER_PAGE,
  );

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const history = await getOrderHistory();

      const withItems: OrderWithItems[] = await Promise.all(
        history.map(async (order) => {
          const items = await getOrderItems(order.order_id);
          return { ...order, items };
        }),
      );

      setOrders(withItems);
      setLoading(false);
    };

    fetchAllOrders();
  }, []);

  if (loading)
    return (
      <div className="bg-[#fbfaf6] min-h-screen p-4 font-bakery">
        Loading order history...
      </div>
    );

  return (
    <div className="bg-[#fbfaf6] min-h-screen py-12 font-bakery">
      <div className="w-full max-w-6xl px-4 md:px-6 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-chocolate">
            Your Order History
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 btn-nav transition-all font-semibold"
          >
            Back to Home
          </button>
        </div>

        {orders.length === 0 && (
          <p className="text-gray-700">No past orders found.</p>
        )}

        {paginatedOrders.map((order) => (
          <div
            key={order.order_id}
            className="mb-8 p-6 border rounded-2xl bg-white shadow"
          >
            <div className="mb-4 space-y-1 text-sm text-gray-700">
              <p>
                <strong>Order ID:</strong> {order.order_id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.order_date).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ${Number(order.total_amount).toFixed(2)}
              </p>
            </div>

            <CheckOutGrid items={order.items} readOnly={true} />
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn-nav disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 font-semibold text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="btn-nav disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
