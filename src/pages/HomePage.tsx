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
        <h2 className="pb-20 text-5xl font-bold text-center font-seasons text-[#422b24]">
          Products
        </h2>
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
