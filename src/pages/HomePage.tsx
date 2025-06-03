import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Contact from "./Contact";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";

const HomePage = () => {
  const { products, loading } = useProducts();

  if (loading) return <div></div>;

  return (
    <div className="bg-spanish-white text-gray-600 font-bakery">
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Hero />
      </div>

      {/* Other Products section */}
      <section className="min-h-screen py-12 bg-gray-100">
        <h2 className="pb-20 text-5xl font-bold text-center">Products</h2>
        <ProductGrid items={products} columns={4} />
      </section>

      {/* Contact section */}
      <section className="min-h-screen">
        <Contact />
      </section>
    </div>
  );
};

export default HomePage;
