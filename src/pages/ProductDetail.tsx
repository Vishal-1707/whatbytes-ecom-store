
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { products } from "./Index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product not found.</h2>
        <Link to="/" className="text-blue-600 underline">Back to Products</Link>
      </div>
    );
  }

  // If there are multiple images, use them; else fallback to old image field
  const images =
    (product.images && product.images.length > 0)
      ? product.images
      : [product.image];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-14 bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center justify-center w-full">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={img}>
                <img
                  src={img}
                  alt={product.title}
                  className="w-full max-h-72 object-contain rounded-xl border bg-gray-100"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <div className="text-2xl font-semibold text-blue-700">${product.price}</div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} viewBox="0 0 20 20" fill={star <= (product.rating ?? 0) ? '#fcd34d' : '#e5e7eb'} width={20} height={20}>
              <polygon points="10,2 12,7.1 17.5,7.3 13.3,11 14.8,16.2 10,13.4 5.2,16.2 6.7,11 2.5,7.3 8,7.1" />
            </svg>
          ))}
        </div>
        <div className="text-gray-700">{product.description ?? "No description provided."}</div>
        <div className="text-sm text-gray-500">Category: <span className="font-medium">{product.category}</span></div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() =>
              addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
