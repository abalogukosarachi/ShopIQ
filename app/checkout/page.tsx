"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Truck,
  Zap,
  CreditCard,
  Landmark,
  Banknote,
  PartyPopper,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrdersContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { formatPrice } from "@/lib/utils";

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "card" | "transfer" | "cod";

const DELIVERY_OPTIONS: Record<
  DeliveryMethod,
  { label: string; description: string; price: number }
> = {
  standard: { label: "Standard Delivery", description: "2 to 3 business days", price: 2000 },
  express: { label: "Express Delivery", description: "Tomorrow", price: 4500 },
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();

  const [step, setStep] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const [info, setInfo] = useState({ name: "", phone: "", email: "" });

  // Prefill from a logged-in user, without overwriting anything already typed.
  useEffect(() => {
    if (user) {
      setInfo((prev) => ({
        name: prev.name || user.name,
        phone: prev.phone,
        email: prev.email || user.email,
      }));
    }
  }, [user]);
  const [address, setAddress] = useState({
    state: "",
    city: "",
    street: "",
    landmark: "",
    notes: "",
  });
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const deliveryFee = DELIVERY_OPTIONS[deliveryMethod].price;
  const total = subtotal + deliveryFee;

  function next() {
    setStep((s) => Math.min(s + 1, 5));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function placeOrder() {
    setIsPlacingOrder(true);
    // Simulated processing — a real payment/order API call replaces this
    // in the backend sprint.
    setTimeout(() => {
      const generated = `SQ-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      addOrder({
        orderNumber: generated,
        customerEmail: info.email || user?.email || "guest@shopiq.local",
        date: new Date().toISOString(),
        items,
        subtotal,
        deliveryFee,
        total,
        deliveryMethod: DELIVERY_OPTIONS[deliveryMethod].label,
        paymentMethod:
          paymentMethod === "card"
            ? "Debit/Credit Card"
            : paymentMethod === "transfer"
            ? "Bank Transfer"
            : "Cash on Delivery",
        address: {
          street: address.street,
          city: address.city,
          state: address.state,
        },
        status: "Preparing",
      });
      setOrderNumber(generated);
      clearCart();
      setIsPlacingOrder(false);
    }, 1500);
  }

  // ── Success screen ─────────────────────────────────────────────────
  if (orderNumber) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light text-success">
          <PartyPopper size={32} />
        </span>
        <h1 className="font-heading text-2xl font-semibold text-text">
          Thank You!
        </h1>
        <p className="text-sm text-text-muted">
          Your order has been received.
        </p>
        <div className="mt-2 rounded-card border border-border bg-white p-4 text-sm">
          <p className="text-text-muted">Order Number</p>
          <p className="font-heading text-lg font-semibold text-text">
            {orderNumber}
          </p>
          <p className="mt-2 text-text-muted">
            Estimated Delivery:{" "}
            <span className="font-medium text-text">
              {deliveryMethod === "express" ? "Tomorrow" : "2 to 3 Business Days"}
            </span>
          </p>
        </div>
        <div className="mt-3 flex gap-3">
          <Link href="/account/orders">
            <Button variant="secondary">Track Order</Button>
          </Link>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  // ── Empty cart guard ────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <span className="text-4xl">🛒</span>
        <p className="font-medium text-text">Your cart is empty</p>
        <p className="text-sm text-text-muted">
          Add something to your cart before checking out.
        </p>
        <Link href="/">
          <Button className="mt-2">Start Shopping</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container-shopiq flex flex-col gap-xl py-3xl lg:flex-row lg:items-start">
      <div className="flex flex-1 flex-col gap-xl">
        <CheckoutStepper current={step} />

        {/* Step 1: Customer Info */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-lg font-semibold text-text">
              Customer Information
            </h2>
            <Input
              label="Full Name"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              placeholder="Favour Chukwu"
            />
            <Input
              label="Phone Number"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              placeholder="080X XXX XXXX"
            />
            <Input
              label="Email Address"
              type="email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
        )}

        {/* Step 2: Delivery Address */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-lg font-semibold text-text">
              Delivery Address
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                placeholder="Enugu"
              />
              <Input
                label="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                placeholder="Enugu"
              />
            </div>
            <Input
              label="Street Address"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="15 Independence Layout"
            />
            <Input
              label="Nearest Landmark (optional)"
              value={address.landmark}
              onChange={(e) =>
                setAddress({ ...address, landmark: e.target.value })
              }
              placeholder="Opposite City Mall"
            />
            <Input
              label="Delivery Notes (optional)"
              value={address.notes}
              onChange={(e) =>
                setAddress({ ...address, notes: e.target.value })
              }
              placeholder="Call me when you arrive"
            />
          </div>
        )}

        {/* Step 3: Delivery Method */}
        {step === 3 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-lg font-semibold text-text">
              Delivery Method
            </h2>
            <RadioCard
              selected={deliveryMethod === "standard"}
              onSelect={() => setDeliveryMethod("standard")}
              icon={<Truck size={20} />}
              title={DELIVERY_OPTIONS.standard.label}
              description={DELIVERY_OPTIONS.standard.description}
              trailing={formatPrice(DELIVERY_OPTIONS.standard.price)}
            />
            <RadioCard
              selected={deliveryMethod === "express"}
              onSelect={() => setDeliveryMethod("express")}
              icon={<Zap size={20} />}
              title={DELIVERY_OPTIONS.express.label}
              description={DELIVERY_OPTIONS.express.description}
              trailing={formatPrice(DELIVERY_OPTIONS.express.price)}
            />
          </div>
        )}

        {/* Step 4: Payment Method */}
        {step === 4 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-lg font-semibold text-text">
              Payment Method
            </h2>
            <RadioCard
              selected={paymentMethod === "card"}
              onSelect={() => setPaymentMethod("card")}
              icon={<CreditCard size={20} />}
              title="Debit/Credit Card"
              description="Visa, Mastercard, Verve"
            />
            <RadioCard
              selected={paymentMethod === "transfer"}
              onSelect={() => setPaymentMethod("transfer")}
              icon={<Landmark size={20} />}
              title="Bank Transfer"
            />
            <RadioCard
              selected={paymentMethod === "cod"}
              onSelect={() => setPaymentMethod("cod")}
              icon={<Banknote size={20} />}
              title="Cash on Delivery"
              description="Available in select locations"
            />
            <p className="text-xs text-text-muted">
              Payment UI only for now, no charge will be made. Real payment
              processing (Stripe/Paystack) comes in the backend sprint.
            </p>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="flex flex-col gap-4">
            <h2 className="font-heading text-lg font-semibold text-text">
              Review Your Order
            </h2>

            <div className="flex flex-col gap-2 rounded-card border border-border p-4 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} ({item.variantLabel}) × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="rounded-card border border-border p-4 text-sm">
              <p className="mb-1 font-medium text-text">Deliver to</p>
              <p className="text-text-muted">
                {address.street || "Not provided"}, {address.city || "Not provided"},{" "}
                {address.state || "Not provided"}
              </p>
              <p className="mt-2 text-text-muted">
                {info.name || "Not provided"} · {info.phone || "Not provided"}
              </p>
            </div>

            <div className="rounded-card border border-border p-4 text-sm">
              <p className="font-medium text-text">
                {DELIVERY_OPTIONS[deliveryMethod].label}
              </p>
              <p className="text-text-muted">
                Payment:{" "}
                {paymentMethod === "card"
                  ? "Debit/Credit Card"
                  : paymentMethod === "transfer"
                  ? "Bank Transfer"
                  : "Cash on Delivery"}
              </p>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex justify-between">
          {step > 1 ? (
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < 5 ? (
            <Button onClick={next}>Continue</Button>
          ) : (
            <Button
              variant="gold"
              isLoading={isPlacingOrder}
              onClick={placeOrder}
            >
              Place Order
            </Button>
          )}
        </div>
      </div>

      {/* Order summary sidebar */}
      <div className="w-full shrink-0 rounded-card border border-border bg-white p-5 lg:w-80">
        <h2 className="mb-4 font-heading text-lg font-semibold text-text">
          Order Summary
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>Subtotal ({items.length} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>Delivery</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-semibold text-text">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
