import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CheckOutGrid from "../components/CheckOutGrid";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import {
  checkPaymentStatus,
  getOrderHistory,
  resetPaymentConfirmation,
  getOrderItems,
} from "../api/Order";
import { Order } from "../api/types/Order";
import { ProductCardProps } from "../components/ProductCard";

const OrderSummaryPage: React.FC = () => {
  const { clearCart } = useCart();
  const { loading } = useProducts();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<ProductCardProps[]>([]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const verifyPayment = async () => {
      const confirmed = await checkPaymentStatus();

      if (!confirmed) {
        navigate("/");
        return;
      }

      const history = await getOrderHistory();
      const order = history.length > 0 ? history[0] : null;
      setLatestOrder(order);

      if (order?.order_id) {
        const items = await getOrderItems(order.order_id);
        setOrderItems(items);
      }

      clearCart(true);
      setChecking(false);
    };

    verifyPayment();
  }, []);
  /* eslint-disable react-hooks/exhaustive-deps */

  // ✅ Reset backend flag if user refreshes or closes tab
  useEffect(() => {
    const handleUnload = () => {
      resetPaymentConfirmation();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // ✅ Reset backend flag if user clicks "Back to Home"
  const handleBackToHome = async () => {
    await resetPaymentConfirmation();
    navigate("/");
  };

  // Optional: prevent back nav to Square
  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
  }, []);

  if (checking || loading) return <div className="bg-[#fbfaf6] h-screen" />;

  return (
    <section className="py-12 bg-[#fbfaf6] font-bakery min-h-screen">
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-chocolate">
            🎉 Your Order is Confirmed!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. A confirmation email will be sent
            shortly.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10">
          {/* Order Summary */}
          <div className="w-full xl:max-w-sm">
            <div className="p-6 border border-gray-200 rounded-3xl bg-white shadow-md">
              <h2 className="text-3xl font-bold text-black pb-6 border-b border-gray-200">
                Order Summary
              </h2>
              <div className="py-6 border-b border-gray-200 space-y-4">
                <div className="flex justify-between text-lg text-gray-600">
                  <span>Product Cost</span>
                  <span>
                    {latestOrder?.total_amount
                      ? `$${Number(latestOrder.total_amount).toFixed(2)}`
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-6 text-xl font-bold text-chocolate">
                <span>Total</span>
                <span>
                  {latestOrder?.total_amount
                    ? `$${Number(latestOrder.total_amount).toFixed(2)}`
                    : "--"}
                </span>
              </div>
              <div className="pt-6 text-left text-gray-600 text-sm space-y-1">
                {latestOrder?.location && (
                  <p>
                    <strong>📍 Pickup Location:</strong> {latestOrder.location}
                  </p>
                )}
                {latestOrder?.pickup_date && (
                  <p>
                    <strong>📅 Pickup Date:</strong>{" "}
                    {new Date(latestOrder.pickup_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="w-full text-black flex-grow space-y-4">
            <CheckOutGrid items={orderItems} readOnly={true} />
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleBackToHome}
            className="inline-block px-6 py-3 btn-nav transition-all font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummaryPage;
