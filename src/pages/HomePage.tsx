import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Contact from "./Contact";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";
import CheckoutModal from "../components/CheckoutModal";
import CheckOutPage from "./CheckoutPage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { products, loading } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("login") === "true") {
      setShowModal(true);
      setLoginRequired(false);
    }
  }, [location.search]);

  if (loading) return <div></div>;

  return (
    <div className="bg-pastryWhite text-gray-600 font-bakery">
      {/* NavBar + Hero fill the viewport */}
      <div className="min-h-screen flex flex-col">
        <NavBar
          showModal={showModal}
          setShowModal={setShowModal}
          loginRequired={loginRequired}
          setLoginRequired={setLoginRequired}
        />
        <div className="flex-1 flex">
          <Hero />
        </div>
      </div>

      {/* Everything below Hero is outside the height calculation */}
      <div className="min-h-screen py-12 bg-pastryYellow">
        <div className="flex flex-col items-center pb-20">
          <h2 className="text-5xl font-bold text-center font-seasons text-[#422b24]">
            Order
          </h2>
          <p className="text-lg italic text-[#422b24]">(for pick up only)</p>
        </div>

        <ProductGrid items={products} columns={4} />
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
