
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Product } from "@/pages/Index";

const ProductCard: React.FC<{
  product: Product;
  onAddToCart: () => void;
}> = ({ product, onAddToCart }) => {
  const { title, price, image, id, rating } = product;

  return (
    <div className="bg-white rounded-xl shadow-md flex flex-col p-4 hover:shadow-lg transition-shadow min-h-[340px] relative">
      <Link to={`/product/${id}`} className="block h-40 mb-4 rounded-lg overflow-hidden bg-gray-100 flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="max-h-40 w-auto object-contain mx-auto"
          loading="lazy"
        />
      </Link>
      <div className="flex-1 flex flex-col">
        <Link to={`/product/${id}`} className="text-gray-900 font-semibold text-lg hover:underline">
          {title}
        </Link>
        <div className="text-gray-700 text-sm mt-1">${price}</div>
        {typeof rating === "number" && (
          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map(star => (
              <svg key={star} viewBox="0 0 20 20" fill={star <= rating ? '#fcd34d':'#e5e7eb'} width={18} height={18}>
                <polygon points="10,2 12,7.1 17.5,7.3 13.3,11 14.8,16.2 10,13.4 5.2,16.2 6.7,11 2.5,7.3 8,7.1" />
              </svg>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={onAddToCart}
          className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
