
import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[]; // add images array for multiple photos
  category: string;
  rating?: number;
  description?: string;
  brand?: string;
};

export const products: Product[] = [
  {
    id: "1",
    title: "Running Shoes",
    price: 99,
    image: "/lovable-uploads/photo-1518770660439-4636190af475.jpeg",
    images: [
      "/lovable-uploads/photo-1518770660439-4636190af475.jpeg",
      "/lovable-uploads/photo-1618160702438-9b02ab6515c9",
      "/lovable-uploads/photo-1493962853295-0fd70327578a"
    ],
    category: "Clothing",
    rating: 4,
    description: "Comfortable running shoes for all-day use.",
    brand: "Sportxo",
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 129,
    image: "/lovable-uploads/photo-1531297484001-80022131f5a1.jpeg",
    images: [
      "/lovable-uploads/photo-1531297484001-80022131f5a1.jpeg",
      "/lovable-uploads/photo-1582562124811-c09040d0a901"
    ],
    category: "Electronics",
    rating: 5,
    description: "Experience high-quality sound without wires.",
    brand: "SoundGo",
  },
  {
    id: "3",
    title: "Backpack",
    price: 59,
    image: "/lovable-uploads/photo-1460925895917-afdab827c52f.jpeg",
    images: [
      "/lovable-uploads/photo-1460925895917-afdab827c52f.jpeg"
    ],
    category: "Clothing",
    rating: 4,
    description: "Stylish and spacious backpack for everyday needs.",
    brand: "UrbanWay",
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    image: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpeg",
    images: [
      "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpeg",
      "/lovable-uploads/photo-1618160702438-9b02ab6515c9"
    ],
    category: "Electronics",
    rating: 5,
    description: "Your health companion on your wrist.",
    brand: "Timeify",
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    image: "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg",
    images: [
      "/lovable-uploads/photo-1487058792275-0ad4aaf24ca7.jpeg",
      "/lovable-uploads/photo-1535268647677-300dbf3d78d1"
    ],
    category: "Clothing",
    rating: 4,
    description: "UV protected, stylish sunglasses for all seasons.",
    brand: "SunVista",
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    image: "/lovable-uploads/photo-1531297484001-80022131f5a1.jpeg",
    images: [
      "/lovable-uploads/photo-1531297484001-80022131f5a1.jpeg"
    ],
    category: "Electronics",
    rating: 5,
    description: "Capture your moments with clarity.",
    brand: "PixelWave",
  },
  {
    id: "7",
    title: "T-shirt",
    price: 29,
    image: "/lovable-uploads/photo-1460925895917-afdab827c52f.jpeg",
    images: [
      "/lovable-uploads/photo-1460925895917-afdab827c52f.jpeg"
    ],
    category: "Clothing",
    rating: 3,
    description: "Soft, high-quality cotton t-shirt.",
    brand: "ComfortWear",
  },
  {
    id: "8",
    title: "Smartphone",
    price: 699,
    image: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpeg",
    images: [
      "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpeg"
    ],
    category: "Electronics",
    rating: 5,
    description: "Sleek design, stellar performance.",
    brand: "TechDream",
  },
];

const Index = () => {
  const [category, setCategory] = useState<string>("All");
  const [price, setPrice] = useState<number>(1000);
  const [search, setSearch] = useState<string>("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        category === "All" || p.category === category;
      const priceMatch = p.price <= price;
      const searchMatch =
        search.length === 0 ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    });
  }, [category, price, search]);

  const { addItem } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7fb]">
      <Header onSearch={setSearch} searchValue={search} />
      <main className="max-w-7xl mx-auto flex flex-1 min-h-[70vh] w-full gap-8 px-6 py-8">
        <Sidebar category={category} onCategoryChange={setCategory} price={price} onPriceChange={setPrice} />
        <section className="flex-1 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Product Listing</h1>
          </div>
          <ProductGrid products={filtered} onAddToCart={(product) =>
            addItem({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
            })
          } />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

