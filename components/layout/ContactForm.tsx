"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/** Demo contact form. It shows a thank you message; a real inbox comes with the backend later. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-card border border-border bg-white p-xl text-center shadow-card">
        <CheckCircle2 size={32} className="text-success" />
        <p className="font-heading text-lg font-semibold text-text">
          Thank you, we got your message
        </p>
        <p className="text-sm text-text-muted">
          Our team will reply to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-4 rounded-card border border-border bg-white p-xl shadow-card"
    >
      <Input label="Your name" name="name" required />
      <Input label="Email address" name="email" type="email" required />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-input border border-border bg-white px-4 py-3 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <Button type="submit">Send Message</Button>
    </form>
  );
}
