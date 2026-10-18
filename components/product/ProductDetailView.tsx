"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Check, Minus, Plus, Truck } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/product/RatingStars";
import { ProductImagePlaceholder } from "@/components/product/ProductImagePlaceholder";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn, formatPrice } from "@/lib/utils";

export function ProductDetailView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const variant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];
  const inStock = variant.stock > 0;

  const gallery =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];
  const [activeImage, setActiveImage] = useState(0);

  function handleAddToCart() {
    if (!inStock) return;
    addItem(product, variant.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Image gallery */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-white">
          {gallery.length > 0 ? (
            <Image
              src={gallery[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain p-6"
            />
          ) : (
            <ProductImagePlaceholder
              label={product.name}
              className="h-full w-full"
            />
          )}
        </div>

        {gallery.length > 1 && (
          <div className="flex gap-2">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-image border-2 bg-white",
                  i === activeImage ? "border-primary" : "border-transparent"
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-text-muted">
            {product.brand}
          </p>
          <h1 className="font-heading text-2xl font-semibold text-text">
            {product.name}
          </h1>
        </div>

        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex flex-wrap gap-2">
          <Badge tone={inStock ? "success" : "danger"}>
            {inStock ? "🟢 In Stock" : "Out of Stock"}
          </Badge>
          <Badge tone="neutral">
            <Truck size={12} className="mr-1 inline" />
            {product.deliveryEstimate}
          </Badge>
        </div>

        <div className="flex items-baseline gap-3 border-y border-border py-3">
          <span className="font-heading text-3xl font-bold text-text">
            {formatPrice(variant.price)}
          </span>
          {variant.compareAtPrice && (
            <>
              <span className="text-sm text-text-muted line-through">
                {formatPrice(variant.compareAtPrice)}
              </span>
              <span className="text-sm font-medium text-success">
                You save {formatPrice(variant.compareAtPrice - variant.price)}
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-text-muted">{product.description}</p>

        {/* Size selection */}
        <div>
          <p className="mb-2 text-sm font-medium text-text">
            {product.optionName
              ? `Choose your ${product.optionName}`
              : "Available sizes"}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                disabled={v.stock === 0}
                className={cn(
                  "rounded-button border px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  v.id === selectedVariantId
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border text-text hover:border-primary"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <p className="mb-2 text-sm font-medium text-text">Quantity</p>
          <div className="flex w-fit items-center rounded-button border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-text hover:text-primary"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-sm font-medium">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity((q) => Math.min(variant.stock, q + 1))
              }
              className="flex h-10 w-10 items-center justify-center text-text hover:text-primary"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant={justAdded ? "success" : "primary"}
            size="lg"
            className="flex-1"
            disabled={!inStock}
            onClick={handleAddToCart}
          >
            {justAdded ? (
              <>
                <Check size={18} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={18} /> Add to Cart
              </>
            )}
          </Button>
          <Button variant="gold" size="lg" className="flex-1" disabled={!inStock}>
            Buy Now
          </Button>
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="flex h-12 w-12 items-center justify-center self-center rounded-button border border-border sm:self-auto"
          >
            <Heart
              size={20}
              className={cn(
                wishlisted ? "fill-danger text-danger" : "text-text-muted"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
