"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders, Order, OrderStatus } from "@/context/OrdersContext";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";

const STAGES: OrderStatus[] = [
  "Preparing",
  "Packed",
  "Out for Delivery",
  "Delivered",
];

function OrderTracker({ status }: { status: OrderStatus }) {
  const currentIndex = STAGES.indexOf(status);
  return (
    <div className="flex items-center">
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold",
                i <= currentIndex
                  ? "bg-success text-white"
                  : "bg-gray-100 text-text-muted"
              )}
            >
              {i <= currentIndex ? <Check size={12} /> : i + 1}
            </span>
            <span className="hidden text-[10px] text-text-muted sm:block">
              {stage}
            </span>
          </div>
          {i < STAGES.length - 1 && (
            <div
              className={cn(
                "mx-1 h-0.5 flex-1",
                i < currentIndex ? "bg-success" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-card border border-border bg-white">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-text">
            {order.orderNumber}
          </p>
          <p className="text-xs text-text-muted">
            {new Date(order.date).toLocaleDateString()} · {order.items.length}{" "}
            item{order.items.length !== 1 ? "s" : ""} ·{" "}
            {formatPrice(order.total)}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "text-text-muted transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-4 border-t border-border p-4">
          <OrderTracker status={order.status} />

          <div className="flex flex-col gap-2 text-sm">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} ({item.variantLabel}) × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-2 text-xs text-text-muted sm:grid-cols-2">
            <p>
              <span className="font-medium text-text">Delivery: </span>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.deliveryMethod}
            </p>
            <p>
              <span className="font-medium text-text">Payment: </span>
              {order.paymentMethod}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { user } = useAuth();
  const { getOrdersForEmail } = useOrders();

  if (!user) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <p className="text-sm text-text-muted">Sign in to view your orders.</p>
        <Link href="/account">
          <Button>Sign In</Button>
        </Link>
      </main>
    );
  }

  const orders = getOrdersForEmail(user.email);

  return (
    <main className="container-shopiq flex flex-col gap-lg py-3xl">
      <h1 className="font-heading text-2xl font-semibold text-text">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-3xl text-center">
          <Package size={28} className="text-text-muted" />
          <p className="font-medium text-text">No orders yet</p>
          <Link href="/">
            <Button className="mt-1">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <OrderCard key={order.orderNumber} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
