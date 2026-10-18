"use client";

import { useEffect, useState } from "react";
import { Truck, Gift, ShieldCheck, Phone } from "lucide-react";

const MESSAGES = [
  { icon: Truck, text: "Free delivery on qualifying orders" },
  { icon: Gift, text: "Get 10% off your first order" },
  { icon: ShieldCheck, text: "Secure payments, every time" },
  { icon: Phone, text: "Customer support available 7 days a week" },
];

/** Thin rotating bar at the very top of every page. */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { icon: Icon, text } = MESSAGES[index];

  return (
    <div className="flex h-9 items-center justify-center gap-2 bg-primary text-xs font-medium text-white">
      <Icon size={14} />
      <span>{text}</span>
    </div>
  );
}
