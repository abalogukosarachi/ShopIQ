"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrdersProvider } from "@/context/OrdersContext";
import { AddressBookProvider } from "@/context/AddressBookContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <OrdersProvider>
        <AddressBookProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </AddressBookProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
