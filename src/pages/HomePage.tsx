import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Contact from "./Contact";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";
import CheckoutModal from "../components/CheckoutModal";
import CheckOutPage from "./CheckoutPage";
import { useState } from "react";

const HomePage = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { products, loading } = useProducts();

  if (loading) return <div></div>;

  return (
    <div className="bg-pastryWhite text-gray-600 font-bakery">
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Hero />
      </div>

      <div className="min-h-screen py-12 bg-pastryYellow">
        <div className="flex flex-col items-center pb-20">
          <h2 className="text-5xl font-bold text-center font-seasons text-[#422b24]">
            Order
          </h2>
          <p className="text-lg italic text-[#422b24]">(for pick up only)</p>
        </div>

        <ProductGrid items={products} columns={3} />
      </div>

      <section className="min-h-screen">
        <Contact />
      </section>

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)}>
          <CheckOutPage onClose={() => setIsCheckoutOpen(false)} />
        </CheckoutModal>
      )}
    </div>
  );
};

export default HomePage;
