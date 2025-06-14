import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts } from "../api/product";
import { imageMap } from "../data/ProductsHelper";

type Product = {
  product_id: number;
  name: string;
  price: number;
  pack_size: number;
  quantity: number;
  itemImage: string;
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
    const fetchAndMapProducts = async () => {
      try {
        const res = await getProducts();
        const enriched = res.data.map((product: any) => ({
          ...product,
          itemImage: imageMap[product.name] || "/assets/images/default.png",
          sizeClass:
            "w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-72 xl:h-72",
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
