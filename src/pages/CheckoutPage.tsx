import React from "react";
import { useCart } from "../context/CartContext";
import CheckOutGrid from "../components/CheckOutGrid";
import { useProducts } from "../context/ProductContext";
import { SquareCheckout } from "../components/SquareCheckout";

interface CheckOutPageProps {
  onClose: () => void;
}

const CheckOutPage: React.FC<CheckOutPageProps> = ({ onClose }) => {
  const { clearCart } = useCart();
  const { products, loading } = useProducts();

  if (loading) return <div className="bg-cream"></div>;

  return (
    <div className="text-chocolate font-bakery">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b border-chocolate/5">
          <h2 className="text-2xl font-seasons text-chocolate">Your Cart</h2>
          <div className="flex gap-2">
            <button
              className="btn-nav text-sm"
              onClick={() => clearCart(true)}
            >
              Clear Cart
            </button>
            <button className="btn-nav text-sm" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row py-8 gap-8">
          <div className="w-full">
            <CheckOutGrid items={products} />
          </div>
          <div className="">
            <SquareCheckout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
