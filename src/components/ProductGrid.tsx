
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/pages/Index";

const ProductGrid = ({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) => {
  if (!products.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 text-gray-500">
        <span className="text-2xl font-semibold mb-3">No products found</span>
        <span>Try adjusting your filters or search.</span>
      </div>
    );
  }
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
