"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/types/product";

export interface CartItem {
  id: string; // `${productId}-${variantId}`
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  brand: string;
  image?: string;
  variantLabel: string;
  price: number;
  quantity: number;
  maxStock: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, variantId: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "shopiq_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (client only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // Ignore malformed/missing storage — start with an empty cart.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist on every change, after initial hydration.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be unavailable (private browsing, quota) — fail silently.
    }
  }, [items, isHydrated]);

  function addItem(product: Product, variantId: string, quantity = 1) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return;
    const id = `${product.id}-${variant.id}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: Math.min(i.quantity + quantity, variant.stock),
              }
            : i
        );
      }
      return [
        ...prev,
        {
          id,
          productId: product.id,
          variantId: variant.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          image: product.image,
          variantLabel: variant.label,
          price: variant.price,
          quantity: Math.min(quantity, variant.stock),
          maxStock: variant.stock,
        },
      ];
    });
  }

  function removeItem(itemId: string) {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  function updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, quantity: Math.min(quantity, i.maxStock) }
          : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
