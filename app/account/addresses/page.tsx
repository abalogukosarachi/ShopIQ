"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, MapPin, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAddressBook } from "@/context/AddressBookContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AddressesPage() {
  const { user } = useAuth();
  const { addresses, addAddress, removeAddress } = useAddressBook();
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ label: "", street: "", city: "", state: "" });

  if (!user) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <p className="text-sm text-text-muted">
          Sign in to manage saved addresses.
        </p>
        <Link href="/account">
          <Button>Sign In</Button>
        </Link>
      </main>
    );
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.label || !form.street || !form.city || !form.state) return;
    addAddress(form);
    setForm({ label: "", street: "", city: "", state: "" });
    setIsAdding(false);
  }

  return (
    <main className="container-shopiq flex flex-col gap-lg py-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-text">
          Saved Addresses
        </h1>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add Address
          </Button>
        )}
      </div>

      {isAdding && (
        <form
          onSubmit={handleAdd}
          className="flex flex-col gap-4 rounded-card border border-border bg-white p-5"
        >
          <Input
            label="Label (e.g. Home, Office)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            required
          />
          <Input
            label="Street Address"
            value={form.street}
            onChange={(e) => setForm({ ...form, street: e.target.value })}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <Input
              label="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit">Save Address</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !isAdding ? (
        <div className="flex flex-col items-center gap-2 py-3xl text-center">
          <MapPin size={28} className="text-text-muted" />
          <p className="font-medium text-text">No saved addresses yet</p>
          <p className="text-sm text-text-muted">
            Add one so checkout goes even faster next time.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex items-start justify-between rounded-card border border-border bg-white p-4"
            >
              <div>
                <p className="text-sm font-semibold text-text">
                  {address.label}
                </p>
                <p className="text-sm text-text-muted">
                  {address.street}, {address.city}, {address.state}
                </p>
              </div>
              <button
                onClick={() => removeAddress(address.id)}
                aria-label="Remove address"
                className="text-text-muted hover:text-danger"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
