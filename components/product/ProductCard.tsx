"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { Product, ProductBadge } from "@/types/product";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/product/RatingStars";
import { ProductImagePlaceholder } from "@/components/product/ProductImagePlaceholder";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn, formatPrice } from "@/lib/utils";

const BADGE_CONFIG: Record<ProductBadge, { label: string; tone: BadgeTone }> = {
  bestseller: { label: "⭐ Best Seller", tone: "gold" },
  new: { label: "🆕 New Arrival", tone: "primary" },
  "hot-deal": { label: "🔥 Hot Deal", tone: "warning" },
  organic: { label: "🌱 Organic", tone: "success" },
  frozen: { label: "❄️ Frozen", tone: "neutral" },
  "free-delivery": { label: "🚚 Free Delivery", tone: "success" },
};

interface ProductCardProps {
  product: Product;
}

/**
 * ShopIQ's universal product card. Rice today, shampoo tomorrow — same
 * component, only the `product` data changes. Reads/writes the real
 * cart and wishlist via context, so state is shared across the whole site.
 */
export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id
  );
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  const inStock = selectedVariant.stock > 0;
  const discountPct = selectedVariant.compareAtPrice
    ? Math.round(
        ((selectedVariant.compareAtPrice - selectedVariant.price) /
          selectedVariant.compareAtPrice) *
          100
      )
    : null;

  function handleAddToCart() {
    if (!inStock) return;
    addItem(product, selectedVariant.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  function handleToggleWishlist() {
    toggleWishlist(product);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition-shadow hover:shadow-card-hover">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-t-card bg-white">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
              className="object-contain p-3 transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <ProductImagePlaceholder
              label={product.name}
              className="h-full w-full"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.badges?.map((b) => (
            <Badge key={b} tone={BADGE_CONFIG[b].tone}>
              {BADGE_CONFIG[b].label}
            </Badge>
          ))}
          {discountPct && <Badge tone="warning">Save {discountPct}%</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleToggleWishlist}
          aria-label={
            wishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-card transition-transform active:scale-90"
        >
          <Heart
            size={16}
            className={cn(
              "transition-colors",
              wishlisted ? "fill-danger text-danger" : "text-text-muted"
            )}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-xs font-medium text-text-muted">{product.brand}</p>

        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 font-heading text-sm font-semibold text-text hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        {/* Size selector */}
        {product.variants.length > 1 && (
          <select
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="h-8 rounded-input border border-border bg-white px-2 text-xs text-text focus:border-primary focus:outline-none"
            aria-label={`Select ${product.optionName ?? "size"}`}
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-base font-semibold text-text">
            {formatPrice(selectedVariant.price)}
          </span>
          {selectedVariant.compareAtPrice && (
            <span className="text-xs text-text-muted line-through">
              {formatPrice(selectedVariant.compareAtPrice)}
            </span>
          )}
        </div>

        {/* Stock status */}
        <Badge tone={inStock ? "success" : "danger"} className="w-fit">
          {inStock ? "🟢 In Stock" : "Out of Stock"}
        </Badge>

        {/* Add to cart */}
        <Button
          variant={justAdded ? "success" : "primary"}
          size="sm"
          className="mt-auto w-full"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {justAdded ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
