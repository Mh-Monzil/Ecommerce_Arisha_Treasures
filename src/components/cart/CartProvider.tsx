"use client";

import { IProduct } from "@/interfaces/product";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  _id: string;
  title: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getDiscount: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("arisha-cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("arisha-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: IProduct, quantity = 1) => {
    const existingItemIndex = items.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const newItems = [...items];
      newItems[existingItemIndex].quantity += quantity;
      setItems(newItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        _id: product._id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        image: product.images[0],
        quantity,
        inStock: product.stock > 0 ? true : false,
      };
      setItems([...items, newItem]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => !(item._id === id)));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(
      items.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) =>
        total +
        (item.price * item.quantity -
          item.price * item.quantity * (item.discount / 100)),
      0
    );
  };

  const getDiscount = () => {
    return items.reduce(
      (total, item) =>
        total + (item.price * item.quantity * item.discount) / 100,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getDiscount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
