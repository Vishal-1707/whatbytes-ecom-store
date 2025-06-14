
import React, { createContext, useContext, useEffect, useReducer } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; product: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "RESET_CART" }
  ;

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  resetCart: () => void;
} | undefined>(undefined);

const initialState: CartState = {
  items: [],
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = state.items.find((i) => i.id === action.product.id);
      if (item) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "RESET_CART":
      return initialState;
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const persisted = localStorage.getItem("cart");
    return persisted ? JSON.parse(persisted) : init;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (product: Omit<CartItem, "quantity">) =>
    dispatch({ type: "ADD_ITEM", product });

  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", id });

  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });

  const resetCart = () => dispatch({ type: "RESET_CART" });

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
};

