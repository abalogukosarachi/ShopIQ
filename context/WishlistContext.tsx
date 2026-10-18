"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/types/product";

interface WishlistContextValue {
  productIds: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);
const STORAGE_KEY = "shopiq_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProductIds(JSON.parse(raw));
    } catch {
      // Start empty if storage is missing/unreadable.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
    } catch {
      // Fail silently — wishlist just won't persist this session.
    }
  }, [productIds, isHydrated]);

  function isWishlisted(productId: string) {
    return productIds.includes(productId);
  }

  function toggleWishlist(product: Product) {
    setProductIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  }

  return (
    <WishlistContext.Provider
      value={{ productIds, isWishlisted, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
