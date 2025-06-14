
import React from "react";
import { useCart } from "@/contexts/CartContext";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-12 min-h-[400px]">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {!state.items.length && (
        <div className="text-gray-500 py-12 text-center">Your cart is empty.</div>
      )}
      <ul className="divide-y">
        {state.items.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-4 gap-3">
            <div className="flex gap-4 items-center">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded border" />
              <div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-gray-600 text-sm">${item.price}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min={1}
                value={item.quantity}
                onChange={e => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                className="w-14 border px-2 py-1 rounded"
              />
              <button onClick={() => removeItem(item.id)}
                className="ml-2 text-gray-400 hover:text-red-600">
                <X size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <span className="font-semibold text-lg">Total: ${total.toFixed(2)}</span>
        <Link to="/" className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 font-semibold transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
export default Cart;
