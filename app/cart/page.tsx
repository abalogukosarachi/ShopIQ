"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ProductImagePlaceholder } from "@/components/product/ProductImagePlaceholder";
import { formatPrice } from "@/lib/utils";

const DELIVERY_FEE = 2000;

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <span className="text-5xl">🛒</span>
        <h1 className="font-heading text-xl font-semibold text-text">
          Your cart is empty
        </h1>
        <p className="text-sm text-text-muted">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/">
          <Button className="mt-2">Start Shopping</Button>
        </Link>
      </main>
    );
  }

  const total = subtotal + DELIVERY_FEE;

  return (
    <main className="container-shopiq flex flex-col gap-xl py-3xl lg:flex-row lg:items-start">
      {/* Items */}
      <div className="flex flex-1 flex-col gap-lg">
        <h1 className="font-heading text-2xl font-semibold text-text">
          Shopping Cart ({items.length})
        </h1>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-card border border-border bg-white p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-image">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                ) : (
                  <ProductImagePlaceholder
                    label={item.name}
                    className="h-full w-full"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <p className="text-xs text-text-muted">{item.brand}</p>
                <Link
                  href={`/product/${item.slug}`}
                  className="text-sm font-medium text-text hover:text-primary"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-text-muted">{item.variantLabel}</p>
                <p className="text-sm font-semibold text-text">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center rounded-button border border-border">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center text-text hover:text-primary"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.maxStock}
                  className="flex h-8 w-8 items-center justify-center text-text hover:text-primary disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                aria-label="Remove item"
                className="text-text-muted hover:text-danger"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <Link href="/" className="w-fit">
          <Button variant="secondary" size="sm">
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Order summary */}
      <div className="w-full shrink-0 rounded-card border border-border bg-white p-5 lg:w-80">
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">
          Order Summary
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Delivery</span>
            <span>{formatPrice(DELIVERY_FEE)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-text">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <Link href="/checkout">
          <Button size="lg" className="mt-4 w-full">
            <ShoppingCart size={18} /> Proceed to Checkout
          </Button>
        </Link>

        <div className="mt-4 flex flex-col gap-2 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} /> Secure Checkout
          </span>
          <span className="flex items-center gap-1.5">
            <Truck size={14} /> Fast Delivery
          </span>
        </div>
      </div>
    </main>
  );
}
