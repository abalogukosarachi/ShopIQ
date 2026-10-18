"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { productIds } = useWishlist();
  const items = PRODUCTS.filter((p) => productIds.includes(p.id));

  if (items.length === 0) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <span className="text-5xl">❤️</span>
        <h1 className="font-heading text-xl font-semibold text-text">
          Your wishlist is empty
        </h1>
        <p className="text-sm text-text-muted">
          Tap the heart on any product to save it here.
        </p>
        <Link href="/">
          <Button className="mt-2">Start Shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container-shopiq flex flex-col gap-lg py-3xl">
      <h1 className="font-heading text-2xl font-semibold text-text">
        My Wishlist ({items.length})
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
