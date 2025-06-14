
import React from "react";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({
  onSearch,
  searchValue,
}: {
  onSearch: (value: string) => void;
  searchValue: string;
}) => {
  const { state } = useCart();
  const nav = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-blue-700 sticky top-0 z-20 w-full shadow">
      <div className="flex items-center justify-between px-8 py-4 max-w-full">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-white text-2xl font-bold tracking-tight">Logo</span>
        </Link>
        <div className="flex-1 flex justify-center px-8">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchValue}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-500 shadow"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}
                viewBox="0 0 24 24"><circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" /></svg>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative group" aria-label="Cart">
            <ShoppingCart className="text-white" size={28} />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs text-white font-medium px-1.5">
                {state.items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>
          <button type="button" className="rounded-full bg-blue-600 w-10 h-10 flex items-center justify-center border-2 border-blue-300 hover:border-white transition-colors">
            <User className="text-white" size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
