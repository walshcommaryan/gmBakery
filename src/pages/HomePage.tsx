import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Contact from "./Contact";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";
import CheckoutModal from "../components/CheckoutModal";
import CheckOutPage from "./CheckoutPage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-pastryWhite flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-chocolate/20 border-t-chocolate rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pastryWhite text-chocolate font-bakery">
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

      {/* Order Section */}
      <div id="order-section" className="min-h-screen py-16 bg-pastryWhite relative">
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

        <motion.div
          className="flex flex-col items-center pb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-[1px] bg-warmGold" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-warmGold">
              Menu
            </span>
            <div className="w-12 h-[1px] bg-warmGold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-seasons text-chocolate">
            Order
          </h2>
          <p className="text-sm tracking-wide text-milkChocolate mt-2">
            For pick up only
          </p>
        </motion.div>

        <ProductGrid items={products} columns={4} />
      </div>

      {/* Contact Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pastryWhite to-cream pointer-events-none" />
        <Contact />
      </section>

      {/* Footer */}
      <footer className="bg-chocolate text-cream/60 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">GM Petit Cafe</p>
          <p className="text-xs">Handcrafted with love in Austin, TX</p>
        </div>
      </footer>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal onClose={() => setIsCheckoutOpen(false)}>
            <CheckOutPage onClose={() => setIsCheckoutOpen(false)} />
          </CheckoutModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
