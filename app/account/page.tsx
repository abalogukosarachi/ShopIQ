"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

// ── Sign In / Sign Up ──────────────────────────────────────────────────
function AuthForms() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const result =
      mode === "signin"
        ? signIn(email, password)
        : signUp(name, email, password);
    if (!result.ok) setError(result.error ?? "Something went wrong.");
  }

  return (
    <main className="container-shopiq flex justify-center py-3xl">
      <div className="w-full max-w-sm rounded-card border border-border bg-white p-6">
        <div className="mb-5 flex rounded-button bg-gray-100 p-1 text-sm">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-button py-1.5 font-medium transition-colors ${
              mode === "signin" ? "bg-white text-primary shadow-card" : "text-text-muted"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-button py-1.5 font-medium transition-colors ${
              mode === "signup" ? "bg-white text-primary shadow-card" : "text-text-muted"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Favour Chukwu"
              required
            />
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <p className="text-xs text-danger">{error}</p>}
          <Button type="submit" className="w-full">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-[11px] text-text-muted">
          Demo authentication, stored only in your browser, not a real
          account system yet.
        </p>
      </div>
    </main>
  );
}

// ── Dashboard ───────────────────────────────────────────────────────────
function Dashboard() {
  const { user, signOut } = useAuth();
  const { getOrdersForEmail } = useOrders();
  const { productIds } = useWishlist();

  if (!user) return null;
  const orders = getOrdersForEmail(user.email).slice(0, 3);

  const links = [
    { href: "/account/orders", icon: Package, label: "Orders" },
    { href: "/wishlist", icon: Heart, label: `Wishlist (${productIds.length})` },
    { href: "/account/addresses", icon: MapPin, label: "Addresses" },
    { href: "/account/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <main className="container-shopiq flex flex-col gap-xl py-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-text">
            {greeting()}, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-sm text-text-muted">{user.email}</p>
        </div>
        <Button variant="secondary" size="sm" onClick={signOut}>
          <LogOut size={16} /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-2 rounded-card border border-border bg-white p-5 text-center shadow-card hover:shadow-card-hover"
          >
            <Icon size={22} className="text-primary" />
            <span className="text-sm font-medium text-text">{label}</span>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="mb-3 font-heading text-lg font-semibold text-text">
          Recent Orders
        </h2>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border py-xl text-center">
            <ShoppingBag size={24} className="text-text-muted" />
            <p className="text-sm text-text-muted">No orders yet</p>
            <Link href="/">
              <Button size="sm" className="mt-1">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="flex items-center justify-between rounded-card border border-border bg-white p-4 text-sm"
              >
                <div>
                  <p className="font-medium text-text">{order.orderNumber}</p>
                  <p className="text-text-muted">
                    {new Date(order.date).toLocaleDateString()} ·{" "}
                    {order.status}
                  </p>
                </div>
                <p className="font-semibold text-text">
                  {formatPrice(order.total)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <AuthForms />;
}
