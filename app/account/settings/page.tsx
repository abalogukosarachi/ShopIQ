"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <main className="container-shopiq flex flex-col items-center gap-3 py-3xl text-center">
        <p className="text-sm text-text-muted">Sign in to view settings.</p>
        <Link href="/account">
          <Button>Sign In</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container-shopiq flex flex-col gap-lg py-3xl">
      <h1 className="font-heading text-2xl font-semibold text-text">
        Settings
      </h1>

      <div className="flex max-w-sm flex-col gap-4 rounded-card border border-border bg-white p-5">
        <Input label="Full Name" value={user.name} disabled />
        <Input label="Email" value={user.email} disabled />
        <p className="text-[11px] text-text-muted">
          Editing profile details requires a real account backend, coming
          in a later sprint.
        </p>
        <Button variant="danger" onClick={signOut} className="w-fit">
          <LogOut size={16} /> Sign Out
        </Button>
      </div>
    </main>
  );
}
