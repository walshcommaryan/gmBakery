import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckOutGrid from "../components/CheckOutGrid";
import { useProducts } from "../context/ProductContext";
import { SquareCheckout } from "../components/SquareCheckout";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const { clearCart, getTotalQty } = useCart();
  const totalQty = getTotalQty();
  const { products, loading } = useProducts();

  if (loading) return <div className="bg-white"></div>;

  return (
    <div className="min-h-screen bg-gray-300 text-gray-600 font-bakery py-10">
      <div className="rounded-square-w mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 text-center sm:text-left">
          <button
            className="btn-checkout w-full sm:w-auto"
            onClick={() => clearCart(true)}
          >
            Clear Cart
          </button>

          <p className="text-sm sm:text-base flex-1">
            {totalQty === 0
              ? "Your cart is empty"
              : `There ${totalQty === 1 ? "is" : "are"} ${totalQty} item${totalQty === 1 ? "" : "s"} in your cart.`}
          </p>

          <button
            className="btn-checkout w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row py-8 gap-6">
          {/* Card Grid */}
          <div className="w-full lg:w-2/3">
            <CheckOutGrid items={products} />
          </div>

          {/* Stripe Checkout Payment Section */}
          <SquareCheckout />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
