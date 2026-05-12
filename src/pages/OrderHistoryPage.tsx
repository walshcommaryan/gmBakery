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
      <div className="bg-pastryWhite min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-chocolate/20 border-t-chocolate rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="bg-pastryWhite min-h-screen py-12 font-bakery relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="w-full max-w-6xl px-6 md:px-10 mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-warmGold" />
              <span className="text-xs font-medium tracking-[0.3em] uppercase text-warmGold">
                Account
              </span>
            </div>
            <h1 className="text-3xl font-seasons text-chocolate">
              Order History
            </h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="btn-nav"
          >
            &larr; Back to Home
          </button>
        </div>

        {orders.length === 0 && (
          <p className="text-milkChocolate">No past orders found.</p>
        )}

        {paginatedOrders.map((order) => (
          <div
            key={order.order_id}
            className="mb-8 p-6 border border-chocolate/5 rounded-2xl bg-cream/60 backdrop-blur-sm"
          >
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-milkChocolate">
              <span>
                <span className="text-whiteChocolate">Order</span> #{order.order_id}
              </span>
              <span>
                <span className="text-whiteChocolate">Date:</span>{" "}
                {new Date(order.order_date).toLocaleString()}
              </span>
              <span>
                <span className="text-whiteChocolate">Status:</span>{" "}
                <span className="text-chocolate font-medium">{order.status}</span>
              </span>
              <span>
                <span className="text-whiteChocolate">Total:</span>{" "}
                <span className="text-warmGold font-medium">${Number(order.total_amount).toFixed(2)}</span>
              </span>
            </div>

            <CheckOutGrid items={order.items} readOnly={true} />
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="btn-nav disabled:opacity-30"
            >
              &larr; Previous
            </button>
            <span className="text-sm text-milkChocolate">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="btn-nav disabled:opacity-30"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
