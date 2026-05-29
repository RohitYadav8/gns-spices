"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem("gns-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("gns-cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔥 ADDED: Cart page ke + aur - buttons ke liye quantity update function
  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Agar quantity 0 ho jaye, toh automatic remove ho jaye
    );
  };

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  if (!isClient) return null;

  return (
    // Value me updateQuantity aur clearCart ko pass kar diya hai
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);