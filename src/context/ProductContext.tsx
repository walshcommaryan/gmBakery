import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../api/product";
import { imageMap, staticProducts } from "../data/ProductsHelper";
import { ORDERING_ENABLED } from "../config/features";

const SIZE_CLASS =
  "w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-72 xl:h-72";

type Product = {
  product_id: number;
  name: string;
  price: number;
  pack_size: number;
  quantity: number;
  description: string;
  images: string[];
  sizeClass: string;
};

type ProductContextType = {
  products: Product[];
  loading: boolean;
};

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ordering off: there is no API to call, so serve the bundled snapshot.
    if (!ORDERING_ENABLED) {
      setProducts(
        staticProducts.map((product) => ({
          ...product,
          quantity: 0,
          images: imageMap[product.name] || ["/assets/images/default.png"],
          sizeClass: SIZE_CLASS,
        })),
      );
      setLoading(false);
      return;
    }

    const fetchAndMapProducts = async () => {
      try {
        const res = await getProducts();
        const enriched = res.data.map((product: any) => ({
          ...product,
          images: imageMap[product.name] || "/assets/images/default.png",
          sizeClass: SIZE_CLASS,
        }));
        setProducts(enriched);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMapProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
