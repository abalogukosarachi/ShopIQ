"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem } from "@/context/CartContext";

export type OrderStatus =
  | "Preparing"
  | "Packed"
  | "Out for Delivery"
  | "Delivered";

export interface Order {
  orderNumber: string;
  customerEmail: string;
  date: string; // ISO string
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  address: { street: string; city: string; state: string };
  status: OrderStatus;
}

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersForEmail: (email: string) => Order[];
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);
const STORAGE_KEY = "shopiq_orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // Start empty.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Fail silently.
    }
  }, [orders, isHydrated]);

  function addOrder(order: Order) {
    setOrders((prev) => [order, ...prev]);
  }

  function getOrdersForEmail(email: string) {
    return orders.filter(
      (o) => o.customerEmail.toLowerCase() === email.toLowerCase()
    );
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrdersForEmail }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
