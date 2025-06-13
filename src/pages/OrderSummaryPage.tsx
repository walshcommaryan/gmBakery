import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import CheckOutGrid from "../components/CheckOutGrid";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { checkPaymentStatus } from "../api/Order";

const OrderSummaryPage: React.FC = () => {
  const { getTotalPrice } = useCart();
  const { products, loading } = useProducts();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [alreadyChecked, setAlreadyChecked] = useState(false);

  useEffect(() => {
    if (alreadyChecked) return;

    const verifyPayment = async () => {
      setAlreadyChecked(true);
      const confirmed = await checkPaymentStatus();

      if (!confirmed) {
        navigate("/");
      } else {
        setChecking(false);
      }
    };

    verifyPayment();
  }, [navigate, alreadyChecked]);

  useEffect(() => {
    // Optional: prevent back navigation to Square
    window.history.replaceState(null, "", window.location.href);
  }, []);

  if (checking || loading) return <div className="bg-[#fbfaf6] h-screen" />;

  const total = getTotalPrice();

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
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between pt-6 text-xl font-bold text-chocolate">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="w-full text-black flex-grow space-y-4">
            <CheckOutGrid items={products} readOnly={true} />
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/")}
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
