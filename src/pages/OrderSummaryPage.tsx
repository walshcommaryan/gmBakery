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

  useEffect(() => {
    const handleUnload = () => {
      resetPaymentConfirmation();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleBackToHome = async () => {
    await resetPaymentConfirmation();
    navigate("/");
  };

  useEffect(() => {
    window.history.replaceState(null, "", window.location.href);
  }, []);

  if (checking || loading) {
    return (
      <div className="bg-pastryWhite min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-chocolate/20 border-t-chocolate rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-pastryWhite font-bakery min-h-screen relative">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl px-6 md:px-10 mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-warmGold" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-warmGold">
              Thank You
            </span>
            <div className="w-8 h-[1px] bg-warmGold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-seasons text-chocolate">
            Your Order is Confirmed
          </h1>
          <p className="mt-2 text-milkChocolate">
            A confirmation email will be sent shortly.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10">
          {/* Order Summary */}
          <div className="w-full xl:max-w-sm">
            <div className="p-6 border border-chocolate/5 rounded-2xl bg-cream/60 backdrop-blur-sm">
              <h2 className="text-2xl font-seasons text-chocolate pb-5 border-b border-chocolate/5">
                Order Summary
              </h2>
              <div className="py-5 border-b border-chocolate/5">
                <div className="flex justify-between text-milkChocolate">
                  <span>Product Cost</span>
                  <span>
                    {latestOrder?.total_amount
                      ? `$${Number(latestOrder.total_amount).toFixed(2)}`
                      : "--"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-5 text-lg font-medium text-chocolate">
                <span>Total</span>
                <span className="text-warmGold">
                  {latestOrder?.total_amount
                    ? `$${Number(latestOrder.total_amount).toFixed(2)}`
                    : "--"}
                </span>
              </div>
              <div className="pt-5 text-sm text-milkChocolate space-y-2">
                {latestOrder?.location && (
                  <p>
                    <span className="text-whiteChocolate">Pickup:</span> {latestOrder.location}
                  </p>
                )}
                {latestOrder?.pickup_date && (
                  <p>
                    <span className="text-whiteChocolate">Date:</span>{" "}
                    {new Date(latestOrder.pickup_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="w-full flex-grow">
            <CheckOutGrid items={orderItems} readOnly={true} />
          </div>
        </div>

        <div className="text-center mt-12">
          <button onClick={handleBackToHome} className="btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderSummaryPage;
