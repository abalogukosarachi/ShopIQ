"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/ui/SearchBar";
import { CATEGORIES } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { itemCount: cartCount } = useCart();
  const { productIds } = useWishlist();
  const wishlistCount = productIds.length;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="container-shopiq flex h-20 items-center justify-between gap-4">
        {/* Left: mobile menu button + logo */}
        <div className="flex items-center gap-3">
          <button
            className="text-text lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Logo imageClassName="h-14" showTagline />
        </div>

        {/* Center: search — hidden on small screens, shown below navbar instead */}
        <div className="hidden flex-1 max-w-xl md:block">
          <SearchBar />
        </div>

        {/* Right: categories, wishlist, cart, account */}
        <nav className="flex items-center gap-5">
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-text hover:text-primary">
              Categories
              <ChevronDown size={16} />
            </button>
            {isCategoriesOpen && (
              <div className="absolute right-0 top-full w-64 rounded-card border border-border bg-white py-2 shadow-card-hover">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/shop/${cat.slug}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-primary-light hover:text-primary"
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/wishlist"
            className="relative text-text hover:text-primary"
            aria-label="Wishlist"
          >
            <Heart size={22} />
            {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
          </Link>

          <Link
            href="/cart"
            className="relative text-text hover:text-primary"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && <CountBadge count={cartCount} />}
          </Link>

          <Link
            href="/account"
            className="hidden text-text hover:text-primary sm:block"
            aria-label="Account"
          >
            <User size={22} />
          </Link>
        </nav>
      </div>

      {/* Search bar on its own row on mobile */}
      <div className="border-t border-border px-4 py-3 md:hidden">
        <SearchBar />
      </div>

      {/* Mobile slide-in menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-5 shadow-card-hover">
            <div className="mb-6 flex items-center justify-between">
              <Logo imageClassName="h-12" showTagline />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="text-text"
              >
                <X size={22} />
              </button>
            </div>
            <p className="mb-2 text-xs font-semibold uppercase text-text-muted">
              Categories
            </p>
            <div className="flex flex-col">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm text-text hover:bg-primary-light hover:text-primary"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span
      className={cn(
        "absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white"
      )}
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}
