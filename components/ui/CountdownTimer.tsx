"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  /** Deal end time. Defaults to 6 hours from when the component mounts. */
  endsAt?: Date;
  className?: string;
}

function getTimeLeft(endsAt: Date) {
  const diff = Math.max(0, endsAt.getTime() - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

/** ⏱ 02:15:34 — used on Flash Deal cards and the Flash Deals section header. */
export function CountdownTimer({ endsAt, className }: CountdownTimerProps) {
  const [target] = useState(
    () => endsAt ?? new Date(Date.now() + 6 * 60 * 60 * 1000)
  );
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <span className={`font-mono text-xs font-semibold ${className ?? ""}`}>
      {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
    </span>
  );
}
