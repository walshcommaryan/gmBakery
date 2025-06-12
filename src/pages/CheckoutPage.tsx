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

  if (loading) return <div className="bg-[#fbfaf6]"></div>;

  return (
    <div className="text-gray-600 font-bakery">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 text-center sm:text-left">
          <button
            className="btn-nav w-full sm:w-auto"
            onClick={() => clearCart(true)}
          >
            Clear Cart
          </button>

          <button className="btn-nav w-full sm:w-auto" onClick={onClose}>
            Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row py-8 gap-6">
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
